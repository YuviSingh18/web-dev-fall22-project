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
  background-image: url("https://wallpaperaccess.com/full/1311968.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
