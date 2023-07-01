import os

import schedule
import time
from database import Database
from investmentutils import InvestmentUtils
from dotenv import load_dotenv

class Scheduler:
    """Defines a Scheduler with static methods performing verbose operations"""
    load_dotenv()

    @staticmethod
    def update_stock_prices() -> None:
        """Update database's investments price column"""
        with Database(os.getenv("NAME")) as db:
            [InvestmentUtils.update_stock_price(_[0], _[1]) for _ in db.execute(os.getenv("INVESTMENTS"))]

    @staticmethod
    def run() -> None:
        """Runs every 15 minutes"""
        schedule.every(15).minutes.do(Scheduler.update_stock_prices())
        time.sleep(1)


if __name__ == '__main__':
    Scheduler.run()
