import session from "./session";
import { api } from "./session";

export function getWorkouts() {
    return api<Workout[]>("/workouts");
}

export function getWorkout(id: number) {
    return api<Workout>(`/workouts/${id}`);
}

export function deleteWorkout(id: number) {
    return api(`/workouts/${id}`, null, "DELETE").then(() => {
        session.messages.push({ type: 'success', text: 'Workout Deleted'});
    });
}

export function addWorkout(workout: Workout) {
    api<Workout>("/workouts", workout)
    session.messages.push({ type: 'success', text: 'Workout added'});
}

export function updateWorkout(workout: Workout) {
    api<Workout>(`/workouts/${workout.id}`, workout, "PATCH")
    session.messages.push({ type: 'success', text: 'Workout updated'});
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
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    title: string;
    workoutDate: string;
    workoutDuration: string;
    workoutLocation: string;
    pictureUrl: string;
    workoutType: string;
    picUrl: string;
    numberOfLikes: number;
    city: string;
    state: string;
}