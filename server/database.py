import sqlite3
from typing import Optional, List


class Database:

    def __init__(self, db_name: str) -> None:
        if not db_name.endswith('.db'):
            raise ValueError('{} must end with .db'.format(db_name))
        self.name = db_name
        self.conn = self.connect()
        self.cur = self.cursor()

    def __enter__(self) -> 'Database':
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        self.conn.close()

    def connect(self) -> sqlite3.Connection:
        if not self.name:
            raise ValueError('Database name not found')
        return sqlite3.connect(self.name)

    def cursor(self) -> sqlite3.Cursor:
        if not self.conn:
            raise ValueError('Connection not found')
        return self.conn.cursor()

    def commit(self) -> None:
        if not self.conn:
            raise ValueError('Connection not found')
        self.conn.commit()

    def execute(self, sql: str, data: dict = None) -> Optional[List[tuple]]:
        if not self.cur:
            raise ValueError('Cursor not found')
        if data:
            self.cur.execute(sql, data)
        else:
            self.cur.execute(sql)
        self.commit()
        return self.cur.fetchall()
