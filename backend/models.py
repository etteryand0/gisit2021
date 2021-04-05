from sqlalchemy import Column, Integer, ForeignKey, String, Boolean, Enum
from sqlalchemy.orm import relationship
from database import Base, engine
import enum

class BusinessSize(enum.Enum):
  UNSET = 0
  MICRO = 1
  SMALL = 2
  MEDIUM = 3


class BusinessType(enum.Enum):
  U = 1
  I = 2


class BusinessModel(Base):
  __tablename__ = 'business'
  id = Column(Integer, primary_key=True)
  name = Column(String(500))
  business_type = Column(Enum(BusinessType))
  size = Column(Enum(BusinessSize))
  OGRN = Column(String)
  INN  = Column(String)
  type = Column(Integer)
  area = Column(Integer)
  recreated = Column(Boolean)
  licensed = Column(Boolean)
    
Base.prepare(engine)