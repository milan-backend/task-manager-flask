from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session,query
from database import SessionLocal
from models.user import User

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

auth_router = Blueprint("auth", __name__)

# password hashing
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


# JWT CONFIG
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# SIGNUP


@auth_router.route("/auth/signup", methods=["POST"])
def signup():

    db: Session = SessionLocal()

    data = request.json
    email = data.get("email")
    password = data.get("password")

    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        email=email,
        hashed_password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return jsonify({"message": "User created successfully"})


# ---------------------------
# LOGIN
# ---------------------------

@auth_router.route("/auth/login", methods=["POST"])
def login():

    db: Session = SessionLocal()

    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = db.query(User).filter(User.email==email).first()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    if not verify_password(password, user.hashed_password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token({
        "sub": str(user.id)
    })

    return jsonify({
        "access_token": access_token,
        "token_type": "bearer"
    })