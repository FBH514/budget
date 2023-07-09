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
    """Defines project constants"""
    PORT: int = 8000
    HOST: str = f'http://localhost:{PORT}/'
    NAME: str = 'budget'
    VERSION: str = 'v1'
    CACHE_LENGTH: int = (60**2) * 24 * 7
    CATEGORIES: list[str] = [
        "Income", "Expenses", "Investments"
    ]
    ROUTES = {
        'root': '/',
        'income': f'/{NAME}/{VERSION}/income/',
        'expenses': f'/{NAME}/{VERSION}/expenses/',
        'investments': f'/{NAME}/{VERSION}/investments/',
        'ticker': f'/{NAME}/{VERSION}/tickers/' + '{ticker}',
        'add_entry': f'/{NAME}/{VERSION}/add-entry/',
        'update_entry': f'/{NAME}/{VERSION}/update-entry/'
    }


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
@app.get(Project.ROUTES['root'])
async def root() -> dict:
    """
    API root
    :return: dict
    """
    return {'message': 'FBH'}


# GET http://localhost:8000/budget/v1/income/
@cache(Project.CACHE_LENGTH)
@app.get(Project.ROUTES['income'])
async def income(response: Response) -> list:
    """
    Returns income table
    :param response: Response
    :return: list
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INCOME"))
    return [{'id': _[0], 'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/v1/expenses/
@cache(Project.CACHE_LENGTH)
@app.get(Project.ROUTES['expenses'])
async def expenses(response: Response) -> list:
    """
    Returns expenses table
    :param response: Response
    :return: dict
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("EXPENSES"))
    return [{'id': _[0], 'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/v1/investments/
@cache(Project.CACHE_LENGTH)
@app.get(Project.ROUTES['investments'])
async def investments(response: Response) -> list:
    """
    Returns investments table
    :param response: Response
    :return: list
    """
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INVESTMENTS"))
    return [InvestmentUtils.select_investment_row(_[0], _[1], _[2]) for _ in data]


# GET http://localhost:8000/budget/v1/tickers/{ticker}/
@cache(Project.CACHE_LENGTH)
@app.get(Project.ROUTES['ticker'])
async def tickers(response: Response, ticker: str) -> dict:
    """
    Returns ticker data for parameter input
    :param response: Response
    :param ticker: str
    :return: dict
    """
    return Stock(ticker).data


# POST http://localhost:8000/budget/v1/add-entry/
@app.post(Project.ROUTES['add_entry'])
async def add_entry(request: Request) -> dict:
    """"""
    data = await request.json()

    name: str = data.get('name')
    amount: str = data.get('amount')
    price: str = data.get('price')
    shares: str = data.get('shares')
    category: str = data.get('category')

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
    if category != Project.CATEGORIES[2]:
        return {'name': name, 'amount': amount}
    return {'name': name, 'price': price, 'shares': shares}


# PUT http://localhost:8000/budget/v1/update-entry/
@app.put(Project.ROUTES['update_entry'])
async def update_entry(request: Request) -> dict:
    """"""
    data: dict = await request.json()
    with Database(os.getenv('NAME')) as db:
        db.execute(f"""UPDATE {data.get('category')} 
        SET name = :name, amount = :amount WHERE id = :id""")
    return {}

