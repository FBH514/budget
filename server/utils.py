import os

from database import Database
from stock import Stock
from dotenv import load_dotenv


class Utils:
    """"""
    load_dotenv()

    @staticmethod
    def update_stock_price(id: int) -> float:
        """"""
        query = """UPDATE investments SET price = :price WHERE id = :id"""
        current_price = Stock(_[1]).current_price
        with Database(os.getenv("NAME")) as db:
            db.execute(query, {
                "id": id,
                "price": current_price
            })
        return current_price

    @staticmethod
    def select_investment_row(id: int, name: str, shares: float) -> dict:
        """"""
        current_price = Utils.update_stock_price(id)
        return {'name': name, 'amount': shares * current_price}

    @staticmethod
    def update_investment_row(id: int, name: str, shares: float) -> None:
        """"""
        current_price: float = Stock(name).current_price
        query = """UPDATE investments set name = :name, shares = :shares, price = :price where id = :id"""
        with Database(os.getenv("NAME")) as db:
            db.execute(query, {
                "id": id, "name": name, "shares": shares, "price": current_price
            })
