import { reactive } from 'vue';

const data = reactive({
        workout: null as Workout | null,
        workouts: [] as Workout[],
    });

    data.workouts.push(
        {
            firstName: 'Yuvraj',
            lastName: 'Singh',
            handle: 'YuviSingh',
            title: 'Took a walk in the park',
            workoutDate: '10-10-2021',
            workoutDuration: '1 hour 10 minutes',
            workoutLocation: 'Fishkill, NY',  
            pictureUrl: 'https://cdnfiles.hdrcreme.com/27492/medium/a-walk-in-the-park-.jpg?1426816426',
            workoutType: 'Walking',
            picUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/SSSidhu.jpg',
        }
    )

    data.workouts.push(
        {
            firstName: 'Moshe',
            lastName: 'Plotkin',
            handle: 'Jewpaltz',
            title: 'Biked through campus',
            workoutDate: '09-22-2020',
            workoutDuration: '1 hours',
            workoutLocation: 'New Paltz, NY',  
            pictureUrl: 'https://www.rei.com/dam/content_team_080317_61569_mountain_biking_beginners_lg.jpg',
            workoutType: 'Biking',
            picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
        }
    )

    data.workouts.push(
        {
            firstName: 'Yuvraj',
            lastName: 'Singh',
            handle: 'YuviSingh',
            title: 'Went on a hike',
            workoutDate: '06-25-2022',
            workoutDuration: '3 hours',
            workoutLocation: 'Minnewaska State Park Preserve, NY',  
            pictureUrl: 'https://images.squarespace-cdn.com/content/v1/5b46c539f79392287e58d958/1539828931213-97XJ75GCJHPHMST6B7NB/Lake+Minnewaska+-+Minnewaska+State+Park+Reserve+New+York?format=1000w',
            workoutType: 'Hiking',
            picUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/SSSidhu.jpg',
        }
    )

    data.workouts.push(
        {
            firstName: 'Rishabh',
            lastName: 'Patel',
            handle: 'Rishbah',
            title: 'Leg day in the gym',
            workoutDate: '10-20-2022',
            workoutDuration: '1 hour 10 minutes',
            workoutLocation: "Gold's Gym, Newburgh, NY",  
            pictureUrl: 'https://www.elitefts.com/wp/wp-content/uploads/2018/01/PicsArt_01-07-09.42.15-e1515677432273.jpg',
            workoutType: 'Weight Training',
            picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMlP1v5ba8fZbMiZsl2UvKnykXf78ogFHIQ&usqp=CAU',
        }
    )

    data.workouts.push(
        {
            firstName: 'Yuvraj',
            lastName: 'Singh',
            handle: 'YuviSingh',
            title: 'Went on a bike ride',
            workoutDate: '03-15-2022',
            workoutDuration: '2 hours 15 minutes',
            workoutLocation: 'Dutchess Rail Trail, NY', 
            pictureUrl: 'https://townsquare.media/site/704/files/2020/04/dutchess-rail-trail.png',
            workoutType: 'Hiking',
            picUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/SSSidhu.jpg',
        }
    )

    data.workouts.push(
        {
            firstName: 'Moshe',
            lastName: 'Plotkin',
            handle: 'Jewpaltz',
            title: 'Swam through the gunk',
            workoutDate: '09-18-2022',
            workoutDuration: '30 minutes',
            workoutLocation: 'New Paltz, NY',  
            pictureUrl: 'https://baltimorediary.typepad.com/.a/6a00d8341d75c753ef0120a611ca3c970c-pi',
            workoutType: 'Swimming',
            picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
        }
    )

    data.workouts.push(
        {
            firstName: 'Rishabh',
            lastName: 'Patel',
            handle: 'Rishbah',
            title: 'Chest day in the gym',
            workoutDate: '10-20-2021',
            workoutDuration: '1 hour 10 minutes',
            workoutLocation: "Gold's Gym, Fishkill, NY",  
            pictureUrl: 'https://i.ytimg.com/vi/kSpjb4Zj7KE/maxresdefault.jpg',
            workoutType: 'Weight Training',
            picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMlP1v5ba8fZbMiZsl2UvKnykXf78ogFHIQ&usqp=CAU',
        }
    )

    data.workouts.push(
        {
            firstName: 'Moshe',
            lastName: 'Plotkin',
            handle: 'Jewpaltz',
            title: 'Skated through campus',
            workoutDate: '01-18-2022',
            workoutDuration: '1 hour 15 mintes',
            workoutLocation: 'New Paltz, NY',  
            pictureUrl: 'https://cdn.shopify.com/s/files/1/0018/8009/6838/files/ollie_8a8b4de1-dd7e-4667-b65a-d2fd07b221e0.png?v=1540868477',
            workoutType: 'Skating',
            picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMo3I5GL9_Zd_LULXRIXTzRLlVESBnoGp8sw&usqp=CAU',
        }
    )

export function deleteWorkout(workout: Workout) {
    const index = data.workouts.indexOf(workout);
    data.workouts.splice(index, 1);
}

export class Workout {
    public firstName?: string;
    public lastName?: string;
    public handle?: string;
    public title?: string;
    public workoutDate?: string;
    public workoutDuration?: string;
    public workoutLocation?: string;
    public pictureUrl?: string;
    public workoutType?: string;
    public picUrl?: string;
}

export default data;