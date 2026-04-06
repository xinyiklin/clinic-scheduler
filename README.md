# 🏥 Full-Stack Clinic Scheduler

A multi-tenant appointment scheduling system built with React and Django, designed for healthcare environments with role-based access and real-time scheduling workflows.

---

## 🚀 Features

- Role-based access (Admin, Physician, Staff)
- Facility-based multi-tenant architecture
- Interactive scheduler with drag-and-drop rescheduling
- Real-time frontend and backend synchronization
- Color-coded appointment status and types
- RESTful API built with Django REST Framework
- PostgreSQL database with relational schema and constraints

---

## 🛠 Tech Stack

Frontend
- React (Vite)
- Axios
- Bootstrap

Backend
- Django
- Django REST Framework

Database
- PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/xinyiklin/clinic-scheduler.git
cd clinic-scheduler

---

### 2. Backend Setup

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

---

### 3. Configure PostgreSQL

Update settings.py:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'clinic_scheduler',
        'USER': 'clinic_user',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5433',
    }
}

---

### 4. Run migrations

python manage.py migrate

---

### 5. Seed demo data

python manage.py seed_demo

---

### 6. Start backend

python manage.py runserver

---

### 7. Frontend Setup

cd ../frontend
npm install
npm run dev

---

## 🔐 Demo Accounts

Admin
- Username: admin
- Password: Admin123!

Physician
- Username: dr_smith
- Password: Doctor123!

---

## 📌 Notes

- A demo facility and physician are automatically created during setup
- Appointment statuses and types are auto-generated per facility
- Ensure PostgreSQL is running on port 5433 (or update settings accordingly)

---

## 🌐 Future Improvements

- Recurring appointments
- Calendar (week/month view)
- Notifications and reminders
- Multi-facility switching
- Deployment (Render + Vercel)

---

## 📬 Contact

- Email: kevinlin11426@gmail.com
- LinkedIn: https://www.linkedin.com/in/xinyiklin/
- Portfolio: https://xinyiklin.github.io/