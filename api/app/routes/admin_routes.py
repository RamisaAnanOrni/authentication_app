from fastapi import APIRouter, Depends
from ..role_checker import require_admin

router = APIRouter()

@router.get("/admin/dashboard")
def admin_dashboard(user = Depends(require_admin)):
    return {
        "message": "Welcome Admin",
        "admin_email": user.email
    }