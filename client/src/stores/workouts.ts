import myFetch from "@/services/myFetch";

export function getWorkouts() {
    return myFetch<ListEnvelope<Workout>>("/workouts");
}

export function getWorkout(id: number) {
    return myFetch<Workout>(`/workouts/${id}`);
}

export function deleteWorkout(id: number) {
    data.workouts = data.workouts.filter( (workout) => workout.id !== id);
}

export interface ListEnvelope<T> {
    workouts: T[];
    total: number;
    skip: number;
    limit: number;
}
export interface Workout {
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