from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv
from app.configs.schema_base import Base
from app.schema.organisation import Organization
from app.schema.device import Device
from app.schema.pond import Pond
from app.schema.feed_session import FeedSession
from app.schema.species import Species
from app.schema.pond_species import pond_species

load_dotenv()  # Load variables from a .env file if present

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL == None:
    raise Exception("Database URL not found")

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

Base.metadata.create_all(engine)
Organization

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# Dependency function to get DB session
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
