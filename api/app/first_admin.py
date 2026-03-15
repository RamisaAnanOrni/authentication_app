from getpass import getpass
from .database import SessionLocal
from .models import User, Role
from .auth import hash_password

db = SessionLocal()

print("Create Admin Account")

email = input("Enter admin email: ")
password = getpass("Enter admin password: ")

# check if admin role exists
admin_role = db.query(Role).filter(Role.name == "admin").first()

if not admin_role:
    admin_role = Role(name="admin")
    db.add(admin_role)
    db.commit()
    db.refresh(admin_role)

# check if admin already exists
existing_admin = db.query(User).filter(User.email == email).first()

if existing_admin:
    print("Admin already exists with this email")
else:
    new_admin = User(
        name="Admin",
        email=email,
        password=hash_password(password),
        role_id=admin_role.id
    )

    db.add(new_admin)
    db.commit()

    print("Admin created successfully")

db.close()