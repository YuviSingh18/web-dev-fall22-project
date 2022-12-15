<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { isLoading } from '../stores/session';
    import { RouterLink } from "vue-router";
    import { type Workout, deleteWorkout, addWorkout, getWorkouts, updateWorkout } from "../stores/workouts";
    import { type User, updateUser } from "../stores/users";

    let editWorkout = reactive({} as Workout);

    const props = defineProps({
        pageType: String,
    });

    const workouts = reactive([] as Workout[]);
    if(session.loginUserId !== 0) {
        getWorkouts().then( x => workouts.push(...x));
    }

    function reload(id: number) {
        workouts.splice(workouts.findIndex((workout) => workout.id === id), 1);
    }

    let workout = reactive({} as Workout);
    let isActive = ref(false);
    let isEdit = ref(false);

    getWorkouts().then( x => workout.id = x[x.length-1].id + 1);
    workout.firstName = session.user?.firstName as string;
    workout.lastName = session.user?.lastName as string;
    workout.username = session.user?.username as string;
    workout.picUrl = session.user?.picUrl as string;
    workout.userId = session.user?.userId as number;
    workout.numberOfLikes = 0;

    function add() {    
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
        user1.username = user.username;
        user1.picUrl = user.picUrl;
        user1.email = user.email;
        user1.isAdmin = user.isAdmin;
        user1.likedPosts = user.likedPosts;
        updateUser(user1);
        const workout1 = {} as Workout;
        workout1.id = workout.id;
        workout1.userId = workout.userId;
        workout1.firstName = workout.firstName;
        workout1.lastName = workout.lastName;
        workout1.username = workout.username;
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

    function update(workout: Workout) {
        const workout1 = {} as Workout;
        workout1.id = workout.id;
        workout1.userId = workout.userId;
        workout1.firstName = workout.firstName;
        workout1.lastName = workout.lastName;
        workout1.username = workout.username;
        workout1.picUrl = workout.picUrl;
        workout1.title = workout.title;
        workout1.workoutDate = workout.workoutDate;
        workout1.workoutDuration = workout.workoutDuration;
        workout1.workoutLocation = workout.workoutLocation;
        workout1.pictureUrl = workout.pictureUrl;
        workout1.workoutType = workout.workoutType;
        workout1.numberOfLikes = workout.numberOfLikes;
        updateWorkout(workout1);
        editWorkout = {} as Workout;
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
            <p class="msg">You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see your workouts.</p>
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
                            <button class="button is-success" @click="(isActive=false, add())">Add Workout</button>
                            <button class="button" :class="{ 'is-loading': isLoading }" @click="isActive=false">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>


            <div v-for="workout in workouts">
                <div v-if="props.pageType == 'my-workouts'">
                    <div v-if="workout.userId == session.user?.userId">
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
                                        <strong>{{ workout.firstName }} {{ workout?.lastName }}</strong> <small>@{{ workout?.username }}</small> <small>{{ workout?.workoutDate }}</small> <small>{{ workout?.workoutLocation }}</small>
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
                                    <div class="level-right">
                                        <a class="level-item">
                                            <span class="icon is-small" v-if="(session.user?.firstName == workout.firstName)">
                                                <i class="fas fa-edit" @click="(editWorkout = workout, isEdit = true)"></i>
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
                                    <strong>{{ workout.firstName }} {{ workout?.lastName }}</strong> <small>@{{ workout?.username }}</small> <small>{{ workout?.workoutDate }}</small> <small>{{ workout?.workoutLocation }}</small>
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
                                        <span class="icon is-small">
                                            <i class="fas fa-heart" 
                                                :class="{'red' : session.user?.likedPosts.includes(workout.id)}"
                                                @click="toggleLike(workout)"></i>
                                                &nbsp;{{ workout.numberOfLikes }}
                                        </span>                                    
                                    </a>
                                </div>
                                <div class="level-right">
                                    <a class="level-item">
                                        <span class="icon is-small" v-if="(session.user?.firstName == workout.firstName)">
                                            <i class="fas fa-edit" @click="(editWorkout = workout, isEdit = true)"></i>
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div class="media-right">
                            <div v-if="session.user?.firstName == workout.firstName"><button class="delete" :class="{ 'is-loading': isLoading }" @click="deleteWorkout(workout.id); reload(workout.id);"></button></div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="modal" :class="{ 'is-active': isEdit }">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Edit Workout</p>
                            <button class="delete" aria-label="close" @click="isEdit=false"></button>
                        </header>
                        <section class="modal-card-body">
                            <div class="media">
                                <figure class="media-left">
                                    <p class="image is-64x64">
                                        <img :src="workout?.picUrl">
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>
                                                {{ editWorkout.firstName }} {{ editWorkout?.lastName }}
                                            </strong> 
                                            <small>@{{ editWorkout?.username }}</small> 
                                            <small><input type="text" v-model="editWorkout.workoutDate"></small> 
                                            <small><input type="text" v-model="editWorkout.workoutLocation"></small>
                                            <br>
                                            <input type="text" v-model="editWorkout.title">
                                            <div class>
                                                <img :src="editWorkout?.pictureUrl">
                                                <input type="text" v-model="editWorkout.pictureUrl">
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" @click="(isEdit=false, update(editWorkout))">Update Workout</button>
                            <button class="button" :class="{ 'is-loading': isLoading }" @click="isEdit=false">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>

        </div>
        <br>
    </div>
    
</template>


<style scoped>
.column {
    background-color: rgba(255, 255, 255, 0.8);
    width: 60%;
    margin-left: 20%;
    z-index: 5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding-bottom: 20px;
}

.is-loading {
    background-color: rgb(0, 0, 0);
    width: 40%;
    padding: 100px;
    margin-left: 30%;
    margin-top: 5%;
}
 .title{
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: rgb(0, 0, 0);
    margin-top: 70px;
    margin-bottom: 10px;
 }
.red {
    color: red;
}

.msg{
    text-align: center;
    font-size: 20px;
    padding: 0.8em;
    font-weight: 400;
    color: rgb(0, 0, 0);
    margin-top: 25px;
    margin-left: 14%;
    margin-right: 14%;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
 }


</style>