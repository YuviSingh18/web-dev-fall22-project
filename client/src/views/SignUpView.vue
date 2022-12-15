<script setup lang="ts">
    import { RouterLink } from "vue-router";
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { type User, addUser, getUsers } from "../stores/users";

    const user = reactive({} as User);

    async function signup() {
        await getUsers().then( x => user.userId = x[x.length-1].userId + 1);
        user.isAdmin = false;
        if(user.firstName == undefined || user.lastName == undefined || user.username == undefined || user.password == undefined || user.picUrl == undefined || user.email == undefined) {
            alert("Please fill out all fields");
            window.location.href = "/sign-up";
        } else {
            addUser(user);
            alert("Account created!");
        }
    }
</script>

<template>
    <div>
        <h1 class="title">Sign Up</h1>
        <div class="box">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input is-black" type="text" v-model="user.firstName" placeholder="First Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input is-black" type="text" v-model="user.lastName" placeholder="Last Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input is-black" type="text" v-model="user.email" placeholder="abc@xyz.com" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input is-black" type="text" v-model="user.username" placeholder="username" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input is-black" type="password" v-model="user.password" placeholder="Password" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Picture url</label>
                <div class="control">
                    <input class="input is-black" type="text" v-model="user.picUrl" placeholder="url" required>
                </div>
            </div>
            <div class="field">
                <div class="control center">
                    <router-link to="/" class="button is-link" @click="signup()">Sign up</router-link>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>


<style scoped>
    .title {
        text-align: center;
        padding-top: 30px;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        color: rgb(0, 0, 0);
        margin-top: 70px;
        margin-bottom: 20px;
     }
    .box {
        width: 50%;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding: 20px;
    }
    .center {
        display: flex;
        justify-content: center;
    }

</style>