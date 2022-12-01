import myFetch from "@/services/myFetch";
import { computed, reactive } from "vue";
import type { User }  from "./users";
import { getUsers } from "./users";

const users = reactive([] as User[]);
getUsers().then( x => users.push(...x));


const session = reactive({
    user: null as User | null,
    loginUserId: 0,
    loading: 0,
    error: null as string | null,
    messages: [] as Message[],
});

export function setError(error: string | null) {
    session.error = error;
    if(error){
        session.messages.push({ type: 'danger', text: error});
    }
}
export const isLoading = computed(() => !! session.loading);

export async function api<T>(url: string, data: any = null, method?: string ){
    session.loading++;
    setError(null);
    try {
        return await myFetch<T>(url, data, method);
    } catch (error) {
        console.log(error);
        //setError(error as string);
    }finally{
        session.loading--;
    }
    return {} as T;
}

export function login(firstName: string, lastName: string) {
        api<User | boolean>("/users/login", { firstName, lastName })
        .then( x => { 
            if(x === false){
                setError("Login failed: user not found");
            }else{
                session.user = x as User;
                session.loginUserId = (x as User).userId; 
            } 
        });
}

export function logout() {
    session.user = null;
    session.loginUserId = 0;
}

export interface Message {
    text: string;
    type: 'danger' | 'warning' | 'success' | 'info';
}
export default session;