<script setup lang="ts">
    import { reactive } from 'vue';
    import { RouterLink } from "vue-router";
    import session from "../stores/session";
    import { login } from "../stores/session";
    let loginEntry = reactive({username: '', password: ''});

    function Login() {
        if(loginEntry.username == '' || loginEntry.password == '') {
            alert("Please fill out all fields");
            window.location.href = "/log-in";
        } else {
            login(loginEntry.username, loginEntry.password);
        }
    }
</script>

<template>
    <div>
        <h1 class="title">Log in</h1>
        <div class="box">
            <div class="field">
                <label class="label">Userame</label>
                <div class="control">
                    <input class="input" type="text" v-model="loginEntry.username" placeholder="Username" />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="loginEntry.password" placeholder="Password" />
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