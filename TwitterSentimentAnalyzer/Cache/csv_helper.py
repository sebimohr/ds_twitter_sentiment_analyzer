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
        if not Path.exists(self.cache_for_hashtag):
            Path.mkdir(self.cache_for_hashtag)

        data.to_csv(Path.joinpath(self.cache_for_hashtag,
                                  f"{datetime.now().strftime('%y-%m-%d_%H-%M-%S')}_{self.default_name}"))

    def GetDataFromCsv(self) -> DataFrame:
        if Path.exists(self.cache_for_hashtag):
            for files in self.cache_for_hashtag.iterdir():
                if files.name.endswith(self.default_name):
                    return read_csv(files.name)

        return DataFrame()
