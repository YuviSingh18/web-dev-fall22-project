import { api } from "./session";

export function getWorkouts() {
    return api<Workout[]>("/workouts");
}

export function getWorkout(id: number) {
    return api<Workout>(`/workouts/${id}`);
}

export function deleteWorkout(id: number) {
    return api<Workout>(`/workouts/${id}`, null, "DELETE");
}

export function addWorkout(workout: Workout) {
    return api<Workout>("/workouts", workout);
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