import yfinance as yf


class Stock:
    """Defines the implementation of the Stock object."""

    def __init__(self, ticker: str) -> None:
        """
        Stock object constructor
        :param ticker: str
        :raises HTTPError if ticker not found on Yahoo Finance
        """
        self._ticker: str = ticker.upper()
        self._data = yf.Ticker(self._ticker).info
        self._name = self._data['longName']

    @property
    def name(self) -> str:
        """Returns the Stock object's name."""
        if self._ticker == "CASH":
            return "Cash"
        return self._name

    @property
    def data(self) -> dict:
        """Returns the Stock object's financial data."""
        if self._ticker == "CASH":
            return {"currentPrice": 1}
        return self._data

    @property
    def current_price(self) -> float:
        """Returns the Stock object's current price."""
        return self._data.get("currentPrice")
