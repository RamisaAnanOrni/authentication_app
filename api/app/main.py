from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import admin_routes
from .database import engine
from .models import Base
from .routes import auth_routes
from .routes import user_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.56.1:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AgriCore API running"}

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(admin_routes.router)