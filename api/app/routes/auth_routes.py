from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User
from ..auth import hash_password
from ..auth import verify_password
from ..jwt_handler import create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):

    user = User(
        name=name,
        email=email,
        password=hash_password(password),
        role_id=2
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created"}

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user.password):
        return {"error": "Invalid password"}

    token = create_access_token({"user_id": user.id})

    return {"access_token": token}