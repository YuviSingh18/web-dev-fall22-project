import { reactive } from 'vue';

const session = reactive({
    user: null as User | null,
    users: [] as User[],
});

session.users.push({
    firstName: 'Yuvraj',
    lastName: 'Singh',
    email: 'singhy2@newpaltz.edu',
    handle: 'YuviSingh',
    isAdmin: true
})

session.users.push({
    firstName: 'Moshe',
    lastName: 'Plotkin',
    email: 'plotkinm@newpaltz.edu',
    handle: 'Jewpaltz',
    isAdmin: false
})

session.users.push({
    firstName: 'Rishabh',
    lastName: 'Patel',
    email: 'patelr5@newpaltz.edu',
    handle: 'Rishbah',
    isAdmin: false
})

export function login(firstName: string, lastName: string) {
    for(let i = 0; i < session.users.length; i++) {
        if(session.users[i].firstName === firstName && session.users[i].lastName === lastName) {
            session.user = session.users[i];
        }
    }
}

export function logout() {
    session.user = null;
}

export class User {
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public handle?: string;
    public isAdmin?: boolean;
}

export default session;