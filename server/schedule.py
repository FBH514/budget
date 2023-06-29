import os

import schedule
import time
from database import Database
from utils import Utils
from dotenv import load_dotenv

class Scheduler:
    """"""
    load_dotenv()

    @staticmethod
    def update_stock_prices() -> None:
        """"""
        with Database(os.getenv("NAME")) as db:
            [Utils.update_stock_price(_[0]) for _ in db.execute(os.getenv("INVESTMENTS"))]

    @staticmethod
    def run() -> None:
        """"""
        schedule.every(15).minutes.do(Scheduler.update_stock_prices())
        time.sleep(1)


if __name__ == '__main__':
    Scheduler.run()
