<script setup lang="ts">
    import { ref,reactive } from 'vue';
    import session from "../stores/session";
    import {type Workout, getWorkouts, addWorkout } from "../stores/workouts";
    
    let workout = reactive({} as Workout);
    
    const workouts = reactive([] as Workout[]);
    getWorkouts().then( x => workouts.push(...x));

    workout.id = 0;
    workout.firstName = session.user?.firstName as string;
    workout.lastName = session.user?.lastName as string;
    workout.handle = session.user?.handle as string;
    workout.picUrl = session.user?.picUrl as string;

    let isActive = ref(false);
    let head = '';let date = '';let l = '';let Url = '';let Duration = '';let Type = '';
</script>

<template>
    <div>
        <div class="button is-info is-fullwidth" @click="isActive = true">Add Workout</div>
        <div class="modal" :class="{ 'is-active': isActive }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Workout</p>
                    <button class="delete" aria-label="close" @click="isActive=false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.title">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.workoutDate">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Duration</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.workoutDuration">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Location</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.workoutLocation">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Picture Url</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.pictureUrl">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Workout Type</label>
                        <div class="control">
                            <input class="input" type="text" v-model="workout.workoutType">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="addWorkout(workout)">Add Workout</button>
                    <button class="button" @click="isActive=false">Cancel</button>
                    <div>{{ workout }}</div>
                </footer>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>