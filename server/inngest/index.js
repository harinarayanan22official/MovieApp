import { Inngest } from "inngest";
import {User} from './models/user.js'

export const inngest = new Inngest({ id: "movie-ticket-booking" });

//create inngest  fucnction to save the user to the database

const syncUserCreation=inngest.createFunction(
    {id:"sync-user-fron-clerk"},
    {event:"clerk/user.created"},
    async({event})=>{
        const{id,first_name,last_name,email_address,image_url}=event.data;
        const userData={
            _id:id,
            email:email_address[0].email_address,
            name:first_name+' '+last_name,
            image:image_url
        }

        await User.create(userData)
    }
)

//delete inngest function to delete the user from database

const syncUserdelection=inngest.createFunction(
    {id:"delete-user-from-clerk"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        const{id}=event.data;
        await User.findByIdAndDelete(id);
    }
)

//update inngest function to update the user data in datebase
const syncUserUpdation=inngest.createFunction(
    {id:"update-user-from-clerk"},
    {event:"clerk/user.updated"},
    async({event})=>{
        const{id,first_name,last_name,email_address,image_url}=event.data;
        const userData={
            _id:id,
            email:email_address[0].email_address,
            name:first_name+' '+last_name,
            image:image_url
        }

        await User.findByIdAndUpdate(id,userData)
    }
)

export const functions = [syncUserCreation,syncUserdelection,syncUserUpdation];