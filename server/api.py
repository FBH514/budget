import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response
from starlette.requests import Request
from dotenv import load_dotenv

from database import Database
from stock import Stock

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
    NAME: str = ''
    VERSION: str = ''
    CACHE_LENGTH: int = (60**2) * 24 * 7


def cache(seconds: int) -> callable:
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
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INCOME"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/expenses/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/expenses/')
async def expenses(response: Response) -> list:
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("EXPENSES"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/investments/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/investments/')
async def investments(response: Response) -> list:
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INVESTMENTS"))
    return [{'name': _[1], 'amount': _[2] * Stock(_[1]).data.get("currentPrice")} for _ in data]


# GET http://localhost:8000/budget/stocks/{ticker}/
@cache(Project.CACHE_LENGTH)
@app.get('/budget/stocks/{ticker}/')
async def stock(response: Response, ticker: str) -> dict:
    """"""
    return Stock(ticker).data


def update_row(id: int) -> None:
    """"""
    pass
