<script setup lang="ts">
    import { ref } from 'vue';
    import session from "../stores/session";
    // import data from "../stores/workouts";
    
    let isActive = ref(false);
    let head = '';let date = '';let Location = '';let Url = '';let Duration = '';let Type = '';
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
                    <!-- <button class="button is-success" @click="data.workouts.push({firstName: session.user?.firstName, lastName: session.user?.lastName, handle: session.user?.handle, title: head as string, workoutDate: date as string, workoutDuration: Duration as string, workoutLocation: Location as string, pictureUrl: Url as string, workoutType: Type as string, picUrl: session.user?.picUrl}); isActive=false; head = '';date = '';Location = '';Url = '';Duration = '';Type = '';">Add Workout</button> -->
                    <button class="button" @click="isActive=false">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>