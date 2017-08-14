from sqlalchemy import Column, Integer, String
from db import Base

class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    key = Column('task_key', String(50), unique=True)
    value = Column('task_value', String(120))

    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value

    def __repr__(self):
        return '<Registry %s:%s>' % (self.key, self.value)
