<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { isLoading } from '../stores/session';
    import { RouterLink } from "vue-router";
    import { getWorkouts } from "../stores/workouts";
    import { type Workout, deleteWorkout, addWorkout, getWorkout, updateWorkout } from "../stores/workouts";
    import { type User, updateUser } from "../stores/users";

    const props = defineProps({
        pageType: String,
    });

    const workouts = reactive([] as Workout[]);
    getWorkouts().then( x => workouts.push(...x));

    function reload(id: number) {
        workouts.splice(workouts.findIndex((workout) => workout.id === id), 1);
    }

    let workout = reactive({} as Workout);
    let isActive = ref(false);

    getWorkouts().then( x => workout.id = x[x.length-1].id + 1);
    workout.firstName = session.user?.firstName as string;
    workout.lastName = session.user?.lastName as string;
    workout.handle = session.user?.handle as string;
    workout.picUrl = session.user?.picUrl as string;

    function reload2() {    
        addWorkout(workout);
        workouts.push(workout);
        workout.title = '';
        workout.workoutDate = '';
        workout.workoutDuration = '';
        workout.workoutLocation = '';
        workout.pictureUrl = '';
        workout.workoutType = '';
    }

    function toggleLike(workout: Workout) {
        if(session.user?.likedPosts.includes(workout.id)) {
            workout.numberOfLikes = workout.numberOfLikes - 1;
            session.user?.likedPosts.splice(session.user?.likedPosts.indexOf(workout.id), 1);
        } else {
            workout.numberOfLikes = workout.numberOfLikes + 1;
            session.user?.likedPosts.push(workout.id);
        }
        const user = session.user as User;
        const user1 = {} as User;
        user1.userId = user.userId;
        user1.firstName = user.firstName;
        user1.lastName = user.lastName;
        user1.handle = user.handle;
        user1.picUrl = user.picUrl;
        user1.email = user.email;
        user1.isAdmin = user.isAdmin;
        user1.likedPosts = user.likedPosts;
        updateUser(user1);
        const workout1 = {} as Workout;
        workout1.id = workout.id;
        workout1.firstName = workout.firstName;
        workout1.lastName = workout.lastName;
        workout1.handle = workout.handle;
        workout1.picUrl = workout.picUrl;
        workout1.title = workout.title;
        workout1.workoutDate = workout.workoutDate;
        workout1.workoutDuration = workout.workoutDuration;
        workout1.workoutLocation = workout.workoutLocation;
        workout1.pictureUrl = workout.pictureUrl;
        workout1.workoutType = workout.workoutType;
        workout1.numberOfLikes = workout.numberOfLikes;
        updateWorkout(workout1);
    }
</script>

<template>
    <div v-if="isLoading" class="loading">
        <button class="button is-loading is-large is-info"></button>
    </div>
    <div v-else>
        <h1 class="title" v-if="props.pageType == 'my-workouts'">My Workouts</h1>
        <h1 class="title" v-else>Friend's Workouts</h1>
        <div v-if="(session.loginUserId == 0)">
            <p>You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see your workouts.</p>
        </div>
        
        <div class="column" v-else>
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
                            <button class="button is-success" @click="(isActive=false, reload2())">Add Workout</button>
                            <button class="button" :class="{ 'is-loading': isLoading }" @click="isActive=false">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
            <div v-for="workout in workouts">
                <div v-if="props.pageType == 'my-workouts'">
                    <div v-if="workout.firstName == session.user?.firstName && workout.lastName == session.user.lastName">
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
                                            <span class="icon is-small"><i class="fas fa-retweet"></i>&nbsp;</span>
                                        </a>
                                        <a class="level-item">
                                            <span class="icon is-small">
                                                <i class="fas fa-heart" 
                                                    :class="{'red' : session.user?.likedPosts.includes(workout.id)}"
                                                    @click="toggleLike(workout)"></i>
                                                &nbsp;{{ workout.numberOfLikes }}
                                            </span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                            <div class="media-right">
                                <button class="delete" :class="{ 'is-loading': isLoading }" @click="reload(workout.id);deleteWorkout(workout.id);"></button>
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
                                        <span class="icon is-small"><i class="fas fa-heart" :class="{'red' : session.user?.likedPosts.includes(workout.id)}">&nbsp;{{ workout.numberOfLikes }}</i></span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div class="media-right">
                            <button class="delete" :class="{ 'is-loading': isLoading }" @click="deleteWorkout(workout.id); reload(workout.id);"></button>
                        </div>
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

.is-loading {
    background-color: lightcyan;
    width: 40%;
    padding: 100px;
    margin-left: 30%;
    margin-top: 5%;
}

.red {
    color: red;
}
</style>