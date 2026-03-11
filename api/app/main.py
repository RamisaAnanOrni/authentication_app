from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import auth_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AgriCore API running"}

app.include_router(auth_routes.router)