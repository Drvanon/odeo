from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

engine = create_engine('postgresql:///blog.db', convert_unicode=True)
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = session.query_property()


class Entry(Base):
    __tablename__ = 'entries'

    id = Column(Integer, primary_key=True)
    title = Column(String(50), unique=True)
    content = Column(String())
    date = Column(DateTime)

    def __init__(self, title, content):
        self.title = title
        self.content = content
        self.date = datetime.now()


def init_db():
    Base.metadata.create_all(bind=engine)
