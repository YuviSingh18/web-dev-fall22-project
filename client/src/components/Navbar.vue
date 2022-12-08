<script setup lang="ts">
import { ref } from 'vue';
import LoginBadge from "./Login-badge.vue";
import { RouterLink } from "vue-router";
import MessageList from './MessageList.vue';

let isActive = ref(false);
</script>

<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <div class="logo"><img src="../assets/favicon1.png"/></div>
          </router-link>
      
          <a :class="{ 'is-active': isActive }" @click="isActive = !isActive" role="button" class="navbar-burger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
          <div class="navbar-start">
            <router-link to="/my-workouts" class="navbar-item">
              My Workouts
            </router-link>
      
            <router-link to="/all-workouts" class="navbar-item">
              My Friends' Workouts
            </router-link>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
      
              <div class="navbar-dropdown">
                <router-link to="/users" class="navbar-item">
                  Users
                </router-link>
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
      
          <div class="navbar-end">
            <MessageList />
            <LoginBadge />
          </div>
        </div>
      
      </nav>
</template>



<style scoped>


.logo{
  margin-top: 8px;
  margin-left: 8px;
}
    .logo img {
        width: 40px;
        height: 150%;
    }

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
</style>