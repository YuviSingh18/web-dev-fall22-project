import { api } from "./session";

export function getWorkouts() {
    return api<ListEnvelope<Workout>>("/workouts");
}

export function getWorkout(id: number) {
    return api<Workout>(`/workouts/${id}`);
}

export function deleteWorkout(id: number) {
    return api<Workout>(`/workouts/delete/${id}`, null, "DELETE");
}

export interface ListEnvelope<T> {
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