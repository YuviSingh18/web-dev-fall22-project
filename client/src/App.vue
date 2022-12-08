<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style>

html{
  background-image: url("https://images.unsplash.com/photo-1429277096327-11ee3b761c93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
