from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine = create_engine('sqlite:///reacties.db')

Base = declarative_base()

class Reactie(Base):
    __tablename__ = 'reacties'
    
    id = Column(Integer, primary_key=True)
    naam = Column(String)
    titel = Column(String(300))
    reactie = Column(String(5000))
    datum = Column(DateTime)
    email = Column(String)
    
    def to_dict(self):
        return {'naam': self.naam, 
                'titel': self.titel,
                'reactie': self.reactie,
                'datum': self.datum.strftime("%d %B %Y %I:%M"),
                }
                
    def __init__(self, naam, titel, reactie, email):
        self.naam = naam
        self.titel = titel
        self.reactie =  reactie
        self.email = email
        self.datum = datetime.today()
    
Base.metadata.create_all(engine)

Session = sessionmaker()
Session.configure(bind=engine)