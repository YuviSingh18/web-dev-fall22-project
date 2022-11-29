<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { RouterLink } from "vue-router";
    import { getWorkouts } from "../stores/workouts";
    import AddWorkoutPopUp from "./AddWorkoutPopUp.vue";
    import { type Workout, deleteWorkout } from "../stores/workouts";


    const props = defineProps({
        pageType: String,
    });

    const workouts = reactive([] as Workout[]);
    getWorkouts().then( x => workouts.push(...x.workouts));

    function reload() {
        workouts.splice(0, workouts.length);
        getWorkouts().then( x => workouts.push(...x.workouts));
    }

    let isActive = ref(false);
    let head = '';let date = '';let Location = '';let Url = '';let Duration = '';let Type = '';

    
</script>

<template>
    
    <h1 class="title" v-if="props.pageType == 'my-workouts'">My Workouts</h1>
    <h1 class="title" v-else>Friend's Workouts</h1>
    <div v-if="session.user == null">
        <p>You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see your workouts.</p>
    </div>
    
    <div class="column" v-else>
        <AddWorkoutPopUp />
        <div v-for="workout in workouts" :key="workout.id">
            <div v-if="props.pageType == 'my-workouts'">
                <div v-if="workout.firstName == session.user.firstName && workout.lastName == session.user.lastName">
                    <br>
                    <div class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img :src="workout?.picUrl">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{ workout.firstName }} {{ workout?.lastName }}</strong> <small>@{{ workout?.handle }}</small> <small>{{ workout?.workoutDate }}</small> <small>{{ workout?.workoutLocation }}</small>
                                    <br>
                                    {{ workout?.title }}
                                    <div class>
                                        <img :src="workout?.pictureUrl">
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
                            <button class="delete" @click="(deleteWorkout(workout.id))"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="props.pageType == 'all-workouts'">
                <br>
                <div class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="workout?.picUrl">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ workout.firstName }} {{ workout?.lastName }}</strong> <small>@{{ workout?.handle }}</small> <small>{{ workout?.workoutDate }}</small> <small>{{ workout?.workoutLocation }}</small>
                                <br>
                                {{ workout?.title }}
                                <div class>
                                    <img :src="workout?.pictureUrl">
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
                        <router-link class="delete" :to="`/${props.pageType}`" @click="deleteWorkout(workout.id)">X</router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>


<style scoped>
.column {
    background-color: lightcyan;
    width: 60%;
    margin-left: 20%;
}
</style>