from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from .dependencies import verify_token
from .models import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_admin(payload: dict = Depends(verify_token), db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == payload["user_id"]).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    if not getattr(user, "role", None) or user.role.name != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return user