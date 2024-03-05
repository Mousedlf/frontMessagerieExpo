import {Profile} from "@/app/interfaces/Profile";
import {Message} from "@/app/interfaces/Message";
import {LastMessage} from "@/app/interfaces/LastMessage";

export interface GroupConv{
    id: number
    name: string
    //description: string
    createdBy: Profile
    members: Profile[]
    lastMessage: string
    messages: LastMessage[]
}