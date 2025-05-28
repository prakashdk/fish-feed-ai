import os
import mongoengine as me
from dotenv import load_dotenv


def mongo_connect():
    """Establishes a MongoDB connection using environment variables, with optional authentication."""
    load_dotenv()

    mongodb_uri = os.getenv("MONGODB_URI")
    database_name = os.getenv("DATABASE", "fish_feed")
    username = os.getenv("MONGO_USER")
    password = os.getenv("MONGO_PASS")
    auth_source = os.getenv("MONGO_AUTH_DB", "admin")

    if not mongodb_uri or not database_name:
        raise ValueError(
            "Missing required MongoDB environment variables (MONGODB_URI, DATABASE_SAGE)."
        )

    try:
        connect_params = {
            "db": database_name,
            "host": mongodb_uri,
            "connect": True,
        }

        if username and password:
            connect_params.update(
                {
                    "username": username,
                    "password": password,
                    "authentication_source": auth_source,
                }
            )

        me.connect(**connect_params)
        print(
            f"Connected to MongoDB: {database_name} {'(Authenticated)' if username and password else '(No Auth)'}"
        )

    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        raise


def mongo_disconnect():
    """Disconnects from MongoDB."""
    me.disconnect()
