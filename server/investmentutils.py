import os

from database import Database
from stock import Stock
from dotenv import load_dotenv


class InvestmentUtils:
    """Defines an InvestmentUtils class with static methods performing verbose operations"""
    load_dotenv()

    @staticmethod
    def update_stock_price(id: int, name: str) -> float:
        """
        Updates price column in database investments table.
        :param id: int
        :param name: str
        :return: float
        """
        with Database(os.getenv("NAME")) as db:
            current_price = Stock(name).current_price
            db.execute(os.getenv("UPDATE_INVESTMENT_PRICE"), {
                "id": id,
                "price": current_price
            })
        return current_price

    @staticmethod
    def select_investment_row(id: int, name: str, shares: float) -> dict:
        """
        Selects name and shares columns from the database's investments table.
        :param id: int
        :param name: str
        :param shares: float
        :return: dict
        """
        current_price = InvestmentUtils.update_stock_price(id, name)
        return {'name': name, 'amount': shares * current_price}

    @staticmethod
    def update_investment_row(id: int, name: str, shares: float) -> None:
        """
        Update all column in the database's investments table.
        :param id: int
        :param name: str
        :param shares: float
        :return: None
        """
        current_price: float = Stock(name).current_price
        with Database(os.getenv("NAME")) as db:
            db.execute(os.getenv("UPDATE_INVESTMENT_ROW"), {
                "id": id, "name": name, "shares": shares, "price": current_price
            })
