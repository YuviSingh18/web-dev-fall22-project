<script setup lang="ts">
import WorkoutDisplay from "../components/WorkoutDisplay.vue";
</script>

<template>
  <main>
    <h1 class="title">This is Home page</h1>
  </main>
  <WorkoutDisplay pageType = 'my-workouts' />
</template>

<style scoped>
  .title {
    padding: 100px;
    text-align: center;
  }
</style>
