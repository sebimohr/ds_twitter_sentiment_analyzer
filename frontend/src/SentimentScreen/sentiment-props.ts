import { Tweet } from "./tweet";
import { SentimentScreenListItem } from "./sentiment-screen-list-item";

export interface SentimentProps {
    hashtag: string
    isShown: boolean
    changeIsShown: Function
    tweetsList: Tweet[]
    topHashtagsList: SentimentScreenListItem[]
    topUsersList: SentimentScreenListItem[]
}
