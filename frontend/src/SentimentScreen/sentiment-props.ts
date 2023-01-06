import { Tweet } from "./tweet";

export interface SentimentProps {
    hashtag: string
    isShown: boolean
    changeIsShown: Function
    tweetsList: Tweet[]
}
