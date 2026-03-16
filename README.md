# authentication_app

## Features

- User authentication with JWT tokens
- Role-based access control
- User dashboard for managing agricultural data
- RESTful API backend
- Responsive Next.js frontend

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** Next.js, React, Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Backend

```bash
cd api
pip install -r ../requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
## To create first admin

``` bash
cd api
cd app 
python -m app.create_admin 
```

The application will be available at `http://localhost:3000`