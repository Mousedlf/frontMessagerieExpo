import {Profile} from "@/app/interfaces/Profile";

export interface Message {
    id: number
    author: Profile
    content: string
    createdAt: string
    reactions: any
    images: any
}