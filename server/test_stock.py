import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from stock import Stock


class StockTestCase(unittest.TestCase):

    @patch('stock.yf.Ticker')
    def test_stock_object_creation(self, mock_ticker):
        mock_ticker.return_value.info = {
            'longName': 'Apple Inc.'
        }
        stock = Stock('AAPL')
        self.assertEqual(stock.name, 'Apple Inc.')

    def test_stock_name_property(self):
        stock = Stock('AAPL')
        self.assertEqual(stock.name, 'Apple Inc.')
        stock = Stock('CASH')
        self.assertEqual(stock.name, 'Cash')

    def test_stock_data_property(self):
        stock = Stock('AAPL')
        self.assertEqual(stock.data, {'longName': 'Apple Inc.'})
        stock = Stock('CASH')
        self.assertEqual(stock.data, {'currentPrice': 1})


if __name__ == '__main__':
    unittest.main()
