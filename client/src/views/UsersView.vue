<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import session from "../stores/session";
    import { type User, getUsers, deleteUser } from "../stores/users";

    const users = reactive([] as User[]);
    getUsers().then( x => users.push(...x));
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
                        <td>{{ user.handle }}</td>
                        <td>{{ user.isAdmin }}</td>
                        <td><button class="button is-danger" @click="deleteUser(user.userId)">Delete</button></td>
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
}
.table {
    margin-left: auto;
    margin-right: auto;
}
.title {
    text-align: center;
    padding-top: 30px;
}
</style>