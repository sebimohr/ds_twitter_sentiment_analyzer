import datetime
from datetime import datetime
from pathlib import Path

from pandas import DataFrame, read_csv


class CsvHelper:
    cache_for_hashtag: Path
    default_name: str = "loaded_tweets.csv"

    def __init__(self, hashtag: str):
        self.cache_for_hashtag = Path.joinpath(Path.cwd(), "Cache", hashtag)

    def SaveDataToCsv(self, data: DataFrame) -> None:
        """ writes data from DataFrame into a csv-file and saves it to the Cache directory """
        if not Path.exists(self.cache_for_hashtag):
            Path.mkdir(self.cache_for_hashtag)

        data.to_csv(Path.joinpath(self.cache_for_hashtag,
                                  f"{datetime.now().strftime('%y-%m-%d_%H-%M-%S')}_{self.default_name}"))

    def GetDataFromCsv(self) -> DataFrame:
        """ loads data from the latest saved csv for the specified hashtag """
        if self.CachedDataDoesExist():
            for files in self.cache_for_hashtag.iterdir():
                if files.name.endswith(self.default_name):
                    return read_csv(files)

        return DataFrame()

    def CachedDataDoesExist(self) -> bool:
        """ tests if cached data for the specified hashtag does exist """
        return Path.exists(self.cache_for_hashtag)
