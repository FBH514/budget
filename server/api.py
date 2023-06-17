import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response
from starlette.requests import Request
from dotenv import load_dotenv

from database import Database

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
@cache((60**2) * 24 * 7)
@app.get('/')
async def root():
    return {'message': 'FBH'}


# GET http://localhost:8000/budget/income/
@cache((60**2) * 24 * 7)
@app.get('/budget/income/')
async def income(response: Response) -> list:
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INCOME"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/expenses/
@cache((60**2) * 24 * 7)
@app.get('/budget/expenses/')
async def expenses(response: Response) -> list:
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("EXPENSES"))
    return [{'name': _[1], 'amount': _[2]} for _ in data]


# GET http://localhost:8000/budget/investments/
@cache((60**2) * 24 * 7)
@app.get('/budget/investments/')
async def investments(response: Response) -> list:
    """"""
    with Database(os.getenv("NAME")) as db:
        data = db.execute(os.getenv("INVESTMENTS"))
    return [{'name': _[1], 'amount': _[2] * _[3]} for _ in data]
