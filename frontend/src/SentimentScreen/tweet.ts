export interface Tweet {
    id: string
    content: string
    metrics: TweetMetrics
    sentiment: TweetSentiment
}

interface TweetMetrics {
    author_id: string
    created_at: Date
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
}

interface TweetSentiment {
    sentiment_score: number
    sentiment_rating_value: number
}
