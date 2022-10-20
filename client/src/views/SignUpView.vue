<script setup lang="ts">
    import { RouterLink } from "vue-router";
    import session from "../stores/session";

    const fName = '';
    const lName = '';
</script>

<template>
    <div>
        <h1 class="title">Sign Up</h1>
        <div class="box">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="fName" placeholder="First Name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="lName" placeholder="Last Name" />
                </div>
            </div>
            <div class="field">
                <div class="control center">
                    <router-link to="/" class="button is-link" @click="session.users.push({firstName: fName, lastName: lName})">Sign up</router-link>
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