import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response
from starlette.requests import Request
from dotenv import load_dotenv

from database import Database
from stock import Stock
from investmentutils import InvestmentUtils

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class Project:
    """Defines project information with constants"""
    NAME: str = ''
    VERSION: str = ''
    CACHE_LENGTH: int = (60**2) * 24 * 7
    CATEGORIES: list[str] = [
        "Income", "Expenses", "Investments"
    ]


def cache(seconds: int) -> callable:
    """
    Defines header caching
    :param seconds: int
    :return: callable
    """
    def decorator(func: callable) -> callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> callable:
            response = args[0]
            response.headers['Cache-Control'] = 'public, max-age={}'.format(seconds)
            return func(*args, **kwargs)
        return wrapper
    return decorator


# GET http://localhost:8000/
@cache(Project.CACHE_LENGTH)
@app.get('/')
async def root() -> dict:
    """"""
    return {'message': 'FBH'}


# GET http://localhost:8000/budget/income/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/income/')
async def income(response: Response) -> list:
    """
    Returns income table
    :param response: Response
    :return: list
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INCOME"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/expenses/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/expenses/')
async def expenses(response: Response) -> list:
    """
    Returns expenses table
    :param response: Response
    :return: dict
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("EXPENSES"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/investments/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/investments/')
async def investments(response: Response) -> list:
    """
    Returns investments table
    :param response: Response
    :return: list
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INVESTMENTS"))
    return [InvestmentUtils.select_investment_row(_[0], _[1], _[2]) for _ in data]


# GET http://localhost:8000/budget/stocks/{ticker}/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/stocks/{ticker}/')
async def stock(response: Response, ticker: str) -> dict:
    """
    Returns stock data for ticker parameter
    :param response: Response
    :param ticker: str
    :return: dict
    """
    return Stock(ticker).data


# POST http://localhost:8000/budget/add-entry/
@app.post('/budget/add-entry/')
async def add_entry(request: Request) -> dict:
    """"""
    data = await request.json()

    name: str = data.get('name')
    amount = data.get('amount')
    price = data.get('price')
    shares = data.get('shares')
    category = data.get('category')

    if category not in Project.CATEGORIES or len(name) < 2:
        return {}

    with Database(os.getenv("NAME")) as db:
        if category == Project.CATEGORIES[2]:
            db.execute(f"""INSERT INTO {category} (name, price, shares) VALUES (:name, :price, :shares)""", {
                'name': name, 'price': price, 'shares': shares
            })
        else:
            db.execute(f"""INSERT INTO {category} (name, amount) VALUES (:name, :amount)""", {
                'name': name, 'amount': amount
            })
    return {'name': data.get('name'), 'amount': data.get('amount'), 'category': data.get('category')}
