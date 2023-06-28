import unittest
from unittest.mock import patch
from requests.exceptions import HTTPError
from stock import Stock


class TestStock(unittest.TestCase):

    @patch('yfinance.Ticker')
    def test_stock_object_creation(self, mock_ticker):

        mock_ticker.return_value.info = {
            'longName': 'Example Company',
        }

        ticker = 'AAPL'
        stock = Stock(ticker)
        self.assertEqual(stock.name, 'Example Company')

        ticker = 'INVALID'
        mock_ticker.side_effect = HTTPError(response=None)
        with self.assertRaises(HTTPError):
            Stock(ticker)


if __name__ == '__main__':
    unittest.main()
