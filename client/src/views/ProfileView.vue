<script setup lang="ts">
import session from "../stores/session";
import { isLoading } from "../stores/session";
import { ref, reactive } from "vue";
import { type User, updateUser } from "../stores/users";
import { type Workout, getWorkouts, updateWorkout } from "../stores/workouts";

let isEditFirstName = ref(false);
let isEditLastName = ref(false);
let isEditEmail = ref(false);
let isEditUsername = ref(false);
let isEditPicture = ref(false);

let firstName = reactive({
  value: session.user?.firstName,
  error: "",
});
let lastName = reactive({
  value: session.user?.lastName,
  error: "",
});
let email = reactive({
  value: session.user?.email,
  error: "",
});
let username = reactive({
  value: session.user?.username,
  error: "",
});
let picUrl = reactive({
  value: session.user?.picUrl,
  error: "",
});
const workouts = reactive([] as Workout[]);


async function update() {
    let user = {} as User;
    user.userId = session.user?.userId as number;
    user.firstName = firstName.value as string;
    user.lastName = lastName.value as string;
    user.username = username.value as string;
    user.picUrl = picUrl.value as string;
    user.email = email.value as string;
    user.isAdmin = session.user?.isAdmin as boolean;
    user.likedPosts = session.user?.likedPosts as number[];
    updateUser(user);
    session.user = user;

    await getWorkouts().then((x) => workouts.push(...x));
    for(let workout of workouts) {
        if (workout.userId === session.user?.userId) {
            const workout1 = {} as Workout;
            workout1.id = workout.id;
            workout1.userId = workout.userId;
            workout1.firstName = firstName.value as string;
            workout1.lastName = lastName.value as string;
            workout1.username = username.value as string;
            workout1.picUrl = picUrl.value as string;
            workout1.title = workout.title;
            workout1.workoutDate = workout.workoutDate;
            workout1.workoutDuration = workout.workoutDuration;
            workout1.workoutLocation = workout.workoutLocation;
            workout1.pictureUrl = workout.pictureUrl;
            workout1.workoutType = workout.workoutType;
            workout1.numberOfLikes = workout.numberOfLikes;
            updateWorkout(workout1);
        }
    };
}
</script>

<template>
    <div v-if="isLoading" class="loading">
        <button class="button is-loading is-large is-info"></button>
    </div>
    <div v-else>
        <h1 class="title">My Profile</h1>
        <div v-if="(session.loginUserId == 0)">
            <p>You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see your profile.</p>
        </div>
        <div v-else>
            <div class="container box">
                <div class="columns">
                    <div class="column is-1"></div>
                    <div class="column is-4">
                        <figure class="image">
                            <img class="is-rounded" :src="session.user?.picUrl" alt="Profile picture">
                            <div class="control">
                                <input class="input" type="text" v-model="picUrl.value" v-if="isEditPicture">
                            </div>
                            <br>
                            <a>
                                <i v-if="!isEditPicture" @click="(isEditPicture = true)" class="fas fa-edit"></i>
                                <div v-else>
                                    <button class="button is-info is-small" @click="(update(), isEditPicture=false)">Save</button>
                                    <button class="button is-white is-small" @click="(isEditPicture=false)">Cancel</button>
                                </div>
                            </a>
                        </figure>
                    </div>
                    <div class="column is-2"></div>
                    <div class="column">
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <div class="disabled input is-black" v-if="!isEditFirstName">{{firstName.value}}</div>
                                <input class="input is-black" type="text" v-model="firstName.value" v-else>
                            </div>
                            <a>
                                <i v-if="!isEditFirstName" @click="(isEditFirstName=true)" class="fas fa-edit"></i>
                                <div v-else>
                                    <button class="button is-info is-small" @click="(update(), isEditFirstName=false)">Save</button>
                                    <button class="button is-white is-small" @click="(isEditFirstName=false)">Cancel</button>
                                </div>                            
                            </a>
                        </div>
                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <div class="disabled input is-black" v-if="!isEditLastName">{{lastName.value}}</div>
                                <input class="input is-black" type="text" v-model="lastName.value" v-else>
                            </div>
                            <a>
                                <i v-if="!isEditLastName" @click="(isEditLastName=true)" class="fas fa-edit"></i>
                                <div v-else>
                                    <button class="button is-info is-small" @click="(update(), isEditLastName=false)">Save</button>
                                    <button class="button is-white is-small" @click="(isEditLastName=false)">Cancel</button>
                                </div>                            
                            </a>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <div class="disabled input is-black" v-if="!isEditEmail">{{email.value}}</div>
                                <input class="input is-black" type="text" v-model="email.value" v-else>
                            </div>
                            <a>
                                <i v-if="(isEditEmail == false)" @click="(isEditEmail = true)" class="fas fa-edit"></i>
                                <div v-else>
                                    <button class="button is-info is-small" @click="(update(), isEditEmail=false)">Save</button>
                                    <button class="button is-white is-small" @click="(isEditEmail=false)">Cancel</button>
                                </div>                            
                            </a>
                        </div>
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <div class="disabled input is-black" v-if="!isEditUsername">{{username.value}}</div>
                                <input class="input is-black" type="text" v-model="username.value" v-else>
                            </div>
                            <a>
                                <i v-if="!isEditUsername" @click="(isEditUsername = true)" class="fas fa-edit"></i>
                                <div v-else>
                                    <button class="button is-info is-small" @click="(update(), isEditUsername=false)">Save</button>
                                    <button class="button is-white is-small" @click="(isEditUsername=false)">Cancel</button>
                                </div>                            
                            </a>
                        </div>
                    </div>
                </div>
                    

                    
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: rgba(224, 255, 255, 0.8);
}
.title{
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: rgb(0, 0, 0);
    margin-top: 70px;
    margin-bottom: 20px;
 }

 .disabled {
    cursor: not-allowed;
 }

 p {
    text-align: center;
    font-size: 20px;
    padding: 0.8em;
    font-weight: 400;
    color: rgb(0, 0, 0);
    margin-top: 25px;
    margin-left: 14%;
    margin-right: 14%;
    background-color: rgba(224, 255, 255, 0.5);
    border-radius: 10px;
 }
</style>