from dataclasses import dataclass


@dataclass
class SortedItem:
    name: str
    count: int
    sentiment: float
    id: str | None = None
