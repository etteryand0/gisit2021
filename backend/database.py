from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base, DeferredReflection
from sqlalchemy.orm import scoped_session, sessionmaker
import os

__dirname = os.path.abspath('.')

path = os.path.join(__dirname, 'businesses.db')

engine = create_engine(path)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base(cls=DeferredReflection)
Base.query = db_session.query_property()