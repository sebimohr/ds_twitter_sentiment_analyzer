import re

from Algorithm.DataClasses.tweet import Tweet
from Algorithm.TopHashtagsAndUsers.sorted_item import SortedItem


class TopHashtagsAndUsersAnalyzer:
    tweet_list: [Tweet]
    hashtag: str

    def __init__(self, tweet_list: [Tweet], hashtag: str):
        self.tweet_list = tweet_list
        self.hashtag = "#" + hashtag

    def AnalyzeTweetList(self) -> tuple[[SortedItem], [SortedItem]]:
        """ Analyzes the top users and hashtags in the given tweet_list """
        user_list = list()
        hashtag_list = list()

        regex = "#(\w+)"

        for tweet in self.tweet_list:
            hashtags = re.findall(regex, tweet.content.lower())
            if self.hashtag in hashtags:
                hashtags.remove(self.hashtag)
            elif self.hashtag[1:] in hashtags:
                hashtags.remove(self.hashtag[1:])

            for hashtag in hashtags:
                hashtag_list = UpdateListWithEntry(hashtag, hashtag_list, tweet.sentiment.sentiment_score)

            user_list = UpdateListWithEntry(tweet.metrics.author_id, user_list, tweet.sentiment.sentiment_score)

        ListSorter(user_list)
        ListSorter(hashtag_list)

        return user_list, hashtag_list


def UpdateListWithEntry(value: str, list_to_update: [SortedItem], sentiment_score: float) -> [SortedItem]:
    try:
        # get index of item in list that matches the value as name
        index = list_to_update.index(next((tag for tag in list_to_update if tag.name == value), None))
        # update sentiment and count when index is found
        list_to_update[index].sentiment = \
            list_to_update[index].sentiment + (sentiment_score / (list_to_update[index].count + 1))
        list_to_update[index].count += 1
    except ValueError:
        # when index couldn't be found -> append new item to list
        list_to_update.append(SortedItem(value, 1, sentiment_score))

    return list_to_update


def ListSorter(list_to_sort: [SortedItem]):
    return list_to_sort.sort(key = lambda x: x.count, reverse = True)
