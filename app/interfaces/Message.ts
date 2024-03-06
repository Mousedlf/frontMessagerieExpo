import {Profile} from "@/app/interfaces/Profile";

export interface Message {
    id: number
    author: Profile
    content: string
    createdAt: string
    isEdited: boolean
    reactions: any
    images: any
}