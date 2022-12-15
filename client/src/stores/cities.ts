import session from "./session";
import { api } from "./session";

export function getCities(regex: string) {
    return api<City[]>("/cities", regex);
}

export interface City {
    name: string;
    code: string;
}