import { reactive } from 'vue';

const session = reactive({
    user: null as User | null,
    users: [] as User[],
});

session.users.push({
    picUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/SSSidhu.jpg',
    firstName: 'Yuvraj',
    lastName: 'Singh',
    email: 'singhy2@newpaltz.edu',
    handle: 'YuviSingh',
    isAdmin: true
})

session.users.push({
    picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
    firstName: 'Moshe',
    lastName: 'Plotkin',
    email: 'plotkinm@newpaltz.edu',
    handle: 'Jewpaltz',
    isAdmin: false
})

session.users.push({
    picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMlP1v5ba8fZbMiZsl2UvKnykXf78ogFHIQ&usqp=CAU',
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

export function deleteUser(user: User) {
    const index = session.users.indexOf(user);
    session.users.splice(index, 1);
}

export function logout() {
    session.user = null;
}

export class User {
    public picUrl?: string;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public handle?: string;
    public isAdmin?: boolean;
}

export default session;