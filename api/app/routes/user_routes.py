from fastapi import APIRouter, Depends
from app.dependencies import verify_token

router = APIRouter()

@router.get("/dashboard")
def dashboard(user=Depends(verify_token)):
    return {"message": "Welcome to dashboard"}