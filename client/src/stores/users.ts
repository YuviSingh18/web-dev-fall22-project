import session from "./session";
import { api } from "./session";

export function getUsers() {
    return api<User[]>("/users");
}

export function getUser(id: number) {
    return api<User>(`/users/${id}`);
}

export function deleteUser(id: number) {
    api<User>(`/users/${id}`, null, "DELETE");
    session.messages.push({ type: 'success', text: 'User Deleted'});
}

export function addUser(user: User) {
    api<User>("/users", user)
    session.messages.push({ type: 'success', text: 'User added'});
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    handle: string;
    isAdmin: boolean;
    picUrl: string;
}