import session from "./session";
import { api } from "./session";

export function getUsers() {
    return api<User[]>("/users");
}

export function getUser(id: number) {
    return api<User>(`/users/${id}`);
}

export function deleteUser(id: number) {
    return api(`/users/${id}`, null, "DELETE").then(() => {
        session.messages.push({ type: 'success', text: 'User Deleted'});
    });
}

export function addUser(user: User) {
    api<User>("/users", user)
    session.messages.push({ type: 'success', text: 'User added'});
}

export function updateUser(user: User) {
    api<User>(`/users/${user.userId}`, user, "PATCH")
    session.messages.push({ type: 'success', text: 'User updated'});
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    handle: string;
    isAdmin: boolean;
    picUrl: string;
    likedPosts: number[];
}