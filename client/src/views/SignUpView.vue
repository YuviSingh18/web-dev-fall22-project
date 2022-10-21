<script setup lang="ts">
    import { RouterLink } from "vue-router";
    import session from "../stores/session";

    const fName = '';
    const lName = '';
    const em = '';
    const hd = '';
    const url = '';
</script>

<template>
    <div>
        <h1 class="title">Sign Up</h1>
        <div class="box">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="fName" placeholder="First Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="lName" placeholder="Last Name" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" v-model="em" placeholder="abc@xyz.com" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Handle</label>
                <div class="control">
                    <input class="input" type="text" v-model="hd" placeholder="handle" required>
                </div>
            </div>
            <div class="field">
                <label class="label">Picture url</label>
                <div class="control">
                    <input class="input" type="text" v-model="url" placeholder="url" required>
                </div>
            </div>
            <div class="field">
                <div class="control center">
                    <router-link to="/" class="button is-link" @click="session.users.push({firstName: fName, lastName: lName, email: em, handle: hd, isAdmin: false, picUrl: url})">Sign up</router-link>
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