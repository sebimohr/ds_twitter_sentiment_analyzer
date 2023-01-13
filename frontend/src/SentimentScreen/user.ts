import { Tweet } from "./tweet";

export interface User {
    id: string
    name: string
    username: string
    description: string
    profile_image_url: string
    metrics: UserMetrics
    tweets: Tweet[]
}

interface UserMetrics {
    followers_count: number
    following_count: number
    tweet_count: number
    listed_count: number
    verified: boolean
}