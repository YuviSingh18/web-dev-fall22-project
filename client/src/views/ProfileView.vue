<script setup lang="ts">
import session from "../stores/session";
import { isLoading } from "../stores/session";
import { ref, reactive } from "vue";
import { type User, updateUser } from "../stores/users";
import { type Workout, getWorkouts, updateWorkout } from "../stores/workouts";

let isEditFirstName = ref(false);
let isEditLastName = ref(false);
let isEditEmail = ref(false);
let isEditHandle = ref(false);
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
let handle = reactive({
  value: session.user?.handle,
  error: "",
});
let picUrl = reactive({
  value: session.user?.picUrl,
  error: "",
});

function update() {
    let user = {} as User;
    user.userId = session.user?.userId as number;
    user.firstName = firstName.value as string;
    user.lastName = lastName.value as string;
    user.handle = handle.value as string;
    user.picUrl = picUrl.value as string;
    user.email = email.value as string;
    user.isAdmin = session.user?.isAdmin as boolean;
    user.likedPosts = session.user?.likedPosts as number[];
    updateUser(user);
    session.user = user;

    const workouts = [] as Workout[];
    getWorkouts().then((x) => workouts.push(...x));
    console.log(workouts);
    for(let workout of workouts) {
        console.log(workout.userId);
        if (workout.userId === session.user?.userId) {
            const workout1 = {} as Workout;
            workout1.id = workout.id;
            workout1.userId = workout.userId;
            workout.firstName = firstName.value as string;
            workout.lastName = lastName.value as string;
            workout.handle = handle.value as string;
            workout.picUrl = picUrl.value as string;
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
                            <a><i v-if="!isEditPicture" @click="(isEditPicture = true)" class="fas fa-edit"></i><button v-else class="submit" @click="(update(), isEditPicture=false)">Save</button></a>
                        </figure>
                    </div>
                    <div class="column is-2"></div>
                    <div class="column">
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="firstName.value" v-if="!isEditFirstName" disabled>
                                <input class="input" type="text" v-model="firstName.value" v-else>
                            </div>
                            <a @click="(isEditFirstName = !isEditFirstName)"><i v-if="!isEditFirstName" class="fas fa-edit"></i><button v-else @click="update()" class="submit">Save</button></a>
                        </div>
                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="lastName.value" v-if="!isEditLastName" disabled>
                                <input class="input" type="text" v-model="lastName.value" v-else>
                            </div>
                            <a @click="(isEditLastName = !isEditLastName)"><i v-if="!isEditLastName" class="fas fa-edit"></i><button v-else @click="update()" class="submit">Save</button></a>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="text" v-model="email.value" v-if="!isEditEmail" disabled>
                                <input class="input" type="text" v-model="email.value" v-else>
                            </div>
                            <a @click="(isEditEmail = !isEditEmail)"><i v-if="!isEditEmail" class="fas fa-edit"></i><button v-else @click="update()" class="submit">Save</button></a>
                        </div>
                        <div class="field">
                            <label class="label">Handle</label>
                            <div class="control">
                                <input class="input" type="text" v-model="handle.value" v-if="!isEditHandle" disabled>
                                <input class="input" type="text" v-model="handle.value" v-else>
                            </div>
                            <a @click="(isEditHandle = !isEditHandle)"><i v-if="!isEditHandle" class="fas fa-edit"></i><button v-else @click="update()" class="submit">Save</button></a>
                        </div>
                    </div>
                </div>
                    

                    
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: lightcyan;
}
</style>