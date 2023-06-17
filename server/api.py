import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response
from starlette.requests import Request
from dotenv import load_dotenv

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
@cache(60)
@app.get('/')
async def root():
    return {'message': 'FBH'}
