from flask import request
from jose import jwt
from database import SessionLocal
from models.user import User
import os

SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"

def get_current_user():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None

    token = auth_header.split(" ")[1]

    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    user_id = payload.get("sub")

    db = SessionLocal()

    user = db.query(User).filter(User.id == user_id).first()

    return user