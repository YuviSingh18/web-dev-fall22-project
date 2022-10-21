<script setup lang="ts">
    import { ref } from 'vue';
    import session, { logout, login } from "../stores/session";
    import { RouterLink } from "vue-router";
    import data, { deleteWorkout } from "../stores/workouts";

    let isActive = ref(false);
    let head = '';let date = '';let Location = '';let Url = '';let Duration = '';let Type = '';

    
</script>

<template>
    <h1 class="title">My Workouts</h1>
    <div v-if="session.user == null">
        <p>You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see your workouts.</p>
    </div>
    <div class="column" v-else>
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
                            <input class="input" type="text" v-model="Location">
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
                    <button class="button is-success" @click="data.workouts.push({firstName: session.user?.firstName, lastName: session.user?.lastName, handle: session.user?.handle, title: head as string, workoutDate: date as string, workoutDuration: Duration as string, workoutLocation: Location as string, pictureUrl: Url as string, workoutType: Type as string, picUrl: session.user?.picUrl}); isActive=false; head = '';date = '';Location = '';Url = '';Duration = '';Type = '';">Add Workout</button>
                    <button class="button" @click="isActive=false">Cancel</button>
                </footer>
            </div>
        </div>
        <div v-for="workout in data.workouts">
            <div v-if="workout.firstName == session.user.firstName && workout.lastName == session.user.lastName">
                <br>
                <div class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="workout.picUrl">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ workout.firstName }} {{ workout.lastName }}</strong> <small>@{{ workout.handle }}</small> <small>{{ workout.workoutDate }}</small> <small>{{ workout.workoutLocation }}</small>
                                <br>
                                {{ workout.title }}
                                <div class>
                                    <img :src="workout.pictureUrl">
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
                        <button class="delete" @click="deleteWorkout(workout)"></button>
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