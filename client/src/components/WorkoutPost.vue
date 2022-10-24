<script setup lang="ts">
    import { Workout, deleteWorkout } from "../stores/workouts";

    const props = defineProps({
        workout: Workout,
    });
</script>

<template>
    <div class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="props.workout?.picUrl">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ props.workout?.firstName }} {{ props.workout?.lastName }}</strong> <small>@{{ props.workout?.handle }}</small> <small>{{ props.workout?.workoutDate }}</small> <small>{{ props.workout?.workoutLocation }}</small>
                    <br>
                    {{ props.workout?.title }}
                    <div class>
                        <img :src="props.workout?.pictureUrl">
                    </div>
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                </div>
            </nav>
        </div>
        <div class="media-right">
            <button class="delete" @click="deleteWorkout(props.workout as Workout)"></button>
        </div>
    </div>
</template>



<style scoped>

</style>