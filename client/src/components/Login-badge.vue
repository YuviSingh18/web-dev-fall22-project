<script setup lang="ts">
    import { ref } from 'vue';
    import session, { logout, login } from "../stores/session";
    import { RouterLink } from "vue-router";

    let dropdownActive = ref(false);
</script>

<template>
    <div class="navbar-item">
        <div class="buttons" v-if="(session.user == null)">
            <router-link to="/sign-up" class="button is-info">
                <strong>Sign up</strong>
            </router-link>
            <!-- <div class="navbar-item has-dropdown" :class="{ 'is-active': dropdownActive }" @click="dropdownActive = !dropdownActive"> -->
            <div class="navbar-item">
                <router-link to="/log-in" class="button is-white">
                    Log in
                </router-link>
                <!-- <div class="navbar-dropdown">
                    <a v-for="user in session.users" class="navbar-item" @click="login(user.firstName as string, user.lastName as string)">
                        {{ user.firstName }} {{ user.lastName }}
                    </a>
                </div> -->
            </div>
        </div>
        <div class="buttons" v-else>
            <div class="welcome"> Welcome {{ session.user.firstName }} {{ session.user.lastName }} </div>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    <i class="fas fa-user"></i>
                </a>
                <div class="navbar-dropdown">
                    <router-link to="/profile" class="navbar-item">
                        Profile
                    </router-link>
                    <a class="navbar-item" @click="logout()">
                        Log out
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .welcome {
        padding: 0 10px;
    }
</style>