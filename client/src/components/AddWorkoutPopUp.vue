<script setup lang="ts">
    import { ref,reactive } from 'vue';
    import session from "../stores/session";
    import {type Workout, getWorkouts, addWorkout } from "../stores/workouts";
    
    let workout = reactive({} as Workout);
    
    const workouts = reactive([] as Workout[]);
    getWorkouts().then( x => workouts.push(...x.workouts));

    workout.id = workouts[workouts.length - 1].id + 1;
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
                            <input class="input" type="text" v-model="head">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Date</label>
                        <div class="control">
                            <input class="input" type="text" v-model="date">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Duration</label>
                        <div class="control">
                            <input class="input" type="text" v-model="Duration">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Location</label>
                        <div class="control">
                            <input class="input" type="text" v-model="l">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Picture Url</label>
                        <div class="control">
                            <input class="input" type="text" v-model="Url">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Workout Type</label>
                        <div class="control">
                            <input class="input" type="text" v-model="Type">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="(workout.workoutDate = date as string, workout.workoutDuration = Duration as string, workout.workoutLocation = l as string, workout.pictureUrl = Url as string, workout.workoutType = Type as string, isActive=false, head = '', date = '', l = '',Url = '',Duration = '',Type = '',addWorkout(workout))">Add Workout</button>
                    <button class="button" @click="isActive=false">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>