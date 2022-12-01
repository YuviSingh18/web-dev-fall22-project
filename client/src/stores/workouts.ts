import session from "./session";
import { api } from "./session";

export function getWorkouts() {
    return api<Workout[]>("/workouts");
}

export function getWorkout(id: number) {
    return api<Workout>(`/workouts/${id}`);
}

export function deleteWorkout(id: number) {
    api<Workout>(`/workouts/${id}`, null, "DELETE");
    session.messages.push({ type: 'success', text: 'Workout Deleted'});
}

export function addWorkout(workout: Workout) {
    api<Workout>("/workouts", workout)
    session.messages.push({ type: 'success', text: 'Workout added'});
}

export interface ListEnvelope<T> {
results: any;
[x: string]: any;
    workouts: T[];
    total: number;
    skip: number;
    limit: number;
}
export interface Workout {
    id: number;
    firstName: string;
    lastName: string;
    handle: string;
    title: string;
    workoutDate: string;
    workoutDuration: string;
    workoutLocation: string;
    pictureUrl: string;
    workoutType: string;
    picUrl: string;
}