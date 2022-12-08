<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { type User, getUsers, deleteUser, updateUser } from "../stores/users";

    const users = reactive([] as User[]);
    getUsers().then( x => users.push(...x));

    function reload(id: number) {
        users.splice(users.findIndex((user) => user.userId === id), 1);
    }

    function toggle(user: User) {
        user.isAdmin = !user.isAdmin;
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
    }
</script>

<template>
    <h1 class="title">Users</h1>
    <div v-if="session.user == null">
        <p>You are not logged in. <RouterLink to="/log-in">Log in</RouterLink> to see the users.</p>
    </div>
    <div v-else>
        <div v-if="session.user?.isAdmin == false">
            <p>You are not an admin. Only admin can see all the users <RouterLink to="/">Go back</RouterLink>.</p>
        </div>
        <div class='box' v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Handle</th>
                        <th>isAdmin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td><img :src="user.picUrl" alt="user picture" width="50" height="50"></td>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.username }}</td>
                        <td>
                            <div v-if="user.isAdmin">True&nbsp;<a class="fas fa-toggle-on" @click="toggle(user)"></a></div>
                            <div v-else>False&nbsp;<a class="fas fa-toggle-off" @click="toggle(user)"></a></div>
                        </td>
                        <td><button class="button is-danger" @click="(deleteUser(user.userId), reload(user.userId))">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>



<style scoped>
.box {
    width: 70%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
}
.table {
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, 0.2);
}
.title {
    text-align: center;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: rgb(0, 0, 0);
    margin-top: 70px;
    margin-bottom: 10px;
 }

 p{
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