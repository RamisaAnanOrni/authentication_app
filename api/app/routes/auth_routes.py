from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schema import SignupRequest
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
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user.password):
        return {"error": "Invalid password"}

    token = create_access_token({"user_id": user.id})

    return {"access_token": token}