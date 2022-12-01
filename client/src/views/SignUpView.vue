<script setup lang="ts">
    import { RouterLink } from "vue-router";
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { type User, addUser, getUsers } from "../stores/users";

    const user = reactive({} as User);

    function signup() {
        getUsers().then( x => user.userId = x[x.length-1].userId + 1);
        user.isAdmin = false;
        if(user.firstName == undefined || user.lastName == undefined || user.handle == undefined || user.picUrl == undefined || user.email == undefined) {
            alert("Please fill out all fields");
        } else {
            addUser(user);
            alert("Account created!");
            window.location.href = "/";
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
                    <input class="input" type="text" v-model="user.firstName" placeholder="First Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="user.lastName" placeholder="Last Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" v-model="user.email" placeholder="abc@xyz.com" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Handle</label>
                <div class="control">
                    <input class="input" type="text" v-model="user.handle" placeholder="handle" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Picture url</label>
                <div class="control">
                    <input class="input" type="text" v-model="user.picUrl" placeholder="url" required>
                </div>
            </div>
            <div class="field">
                <div class="control center">
                    <button class="button is-link" @click="signup()">Sign up</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .title {
        text-align: center;
        padding-top: 30px;
    }
    .box {
        width: 50%;
        margin: 0 auto;
    }
    .center {
        display: flex;
        justify-content: center;
    }
</style>