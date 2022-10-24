<script setup lang="ts">
    import { ref } from 'vue';
    import session from "../stores/session";
    import { RouterLink } from "vue-router";
    import data from "../stores/workouts";
    import WorkoutPost from "./WorkoutPost.vue";
import AddWorkoutPopUp from "./AddWorkoutPopUp.vue";

    const props = defineProps({
        pageType: String,
    });

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
        
        <div v-for="workout in data.workouts">
            <div v-if="props.pageType == 'my-workouts'">
                <div v-if="workout.firstName == session.user.firstName && workout.lastName == session.user.lastName">
                    <br>
                    <WorkoutPost :workout="workout" />
                </div>
            </div>
            <div v-else-if="props.pageType == 'friends-workouts'">
                <br>
                <WorkoutPost :workout="workout" />
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