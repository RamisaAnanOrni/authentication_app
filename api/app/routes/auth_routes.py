from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schema import SignupRequest, LoginRequest
from ..database import SessionLocal
from ..models import User
from ..auth import hash_password, verify_password
from ..jwt_handler import create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CUSTOMER SIGNUP
@router.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role_id=2
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


# LOGIN
@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        return {"error": "User not found"}

    if not verify_password(user.password, db_user.password):
        return {"error": "Invalid password"}

    token = create_access_token({"user_id": db_user.id})

    return {"access_token": token}