<script setup lang="ts">
    import { reactive } from 'vue';
    import { RouterLink } from "vue-router";
    import session from "../stores/session";
    import { login } from "../stores/session";
    let Name = reactive({firstName: '', lastName: ''});

    function Login() {
        if(Name.firstName == '' || Name.lastName == '') {
            alert("Please fill out all fields");
            window.location.href = "/log-in";
        } else {
            login(Name.firstName, Name.lastName);
        }
    }
</script>

<template>
    <div>
        <h1 class="title">Log in</h1>
        <div class="box">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="Name.firstName" placeholder="First Name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="Name.lastName" placeholder="Last Name" />
                </div>
            </div>
            <div class="field">
                <div class="control center">
                    <router-link to="/" class="button is-link" @click="Login()">Log in</router-link>
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
        padding-top: 10px;
    }
</style>