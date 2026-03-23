# DoctorOnCall — Online doctor appointments

**A full-stack web app where patients book visits, doctors manage schedules and prescriptions, and admins oversee the system — all in one place.**

[![Watch on YouTube](https://img.shields.io/badge/Watch_on-YouTube-red?logo=youtube)](https://youtu.be/L6cgb7I-Ap4)
[![Live demo — Netlify](https://img.shields.io/badge/Live_demo-Netlify-00C7B7?logo=netlify)](https://dental-doctor-ujjal.netlify.app/)

---

## In plain English: what is this?

This project is like a **small clinic website**:

- **Patients** can browse doctors, book a time that works for them, pay attention to confirmations, track an appointment with a **tracking ID**, and see prescriptions and invoices in their own area.
- **Doctors** can see who booked them, manage their **available hours**, write **prescriptions**, and keep their **profile** up to date.
- **Admins** get an overview: doctors, patients, appointments, reviews, and more (including optional **read-only “demo” admin** accounts for safe showcases).

You do **not** need to be a developer to **use** the live site. The instructions below are for people who want to **run or customize** the project on their computer.

---

## What you get (features)

| For… | What they can do |
|------|------------------|
| **Visitors** | Home, about, services, blog, contact, search and filter doctors, book appointments. |
| **Patients** | Sign up / sign in, dashboard, favourites, appointments, invoices, prescriptions, **track appointment** with ID. |
| **Doctors** | Sign up (with email verification), dashboard, appointments, patients, schedule, prescriptions, reviews, blogs, invoices, profile settings. |
| **Admins** | Separate admin area: dashboard stats, manage appointments, doctors, patients, specialties, reviews, transactions. **Demo admins** (`isDemo` in database) can view everything but **cannot** change data (enforced by the API). |

**Other useful pieces**

- Email-related flows (e.g. resets, notifications) when you configure Gmail app password.
- **Cloudinary** for profile and content images.
- Modern UI (React + Ant Design) and a structured API (Node + Express + TypeScript + Prisma).

---

## Tech stack (short)

| Layer | Tools |
|-------|--------|
| **Website (frontend)** | React, Redux Toolkit, Ant Design, React Router, Axios |
| **API (backend)** | Node.js, Express, TypeScript |
| **Database** | **PostgreSQL** (this project is set up to use **[Supabase](https://supabase.com/)** — hosted Postgres with a friendly dashboard) |
| **ORM** | Prisma |

---

## Before you start (what to install)

1. **[Node.js](https://nodejs.org/)** (LTS version is best) — includes `npm`.
2. A **Supabase** account (free tier is fine) **or** any other PostgreSQL database.
3. Optional but recommended for full features: **Google** account (app password for mail), **Cloudinary** account (images).

You do **not** have to install Prisma or TypeScript globally — the steps below use `npx`.

---

## Project layout

```
Doctor-Appointment/          ← React app (run from here with npm start)
├── api/                     ← Backend API (Express + Prisma)
│   ├── .env.example         ← Copy to .env and fill in
│   └── prisma/
│       └── schema.prisma    ← Database models
├── .env                     ← Frontend: API URL (see below)
└── project_setup.txt        ← Short checklist (Supabase details are in this README)
```

---

## Setup guide (step by step)

### 1. Clone the repository

```bash
git clone https://github.com/Ujjalzaman/Doctor-Appointment.git
cd Doctor-Appointment
```

### 2. Create the database on Supabase

1. Go to [supabase.com](https://supabase.com/) and sign in.
2. **New project** → choose organization, name, region, and a strong database password.
3. Wait until the project is ready.
4. Open **Project Settings** → **Database**.
5. Under **Connection string**, choose **URI** (PostgreSQL).
6. Copy the string. It looks like  
   `postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-...pooler.supabase.com:6543/postgres`  
   Replace `[YOUR-PASSWORD]` with the password you set for the project.
7. For Prisma, use a connection string that works from your machine. Supabase often provides:
   - **Session mode** (port `5432`) or **Transaction pooler** (port `6543`).  
   If you see SSL errors, add **`?sslmode=require`** at the end of the URL (if not already there).

> **Tip:** Keep this URL secret — it is the key to your database.

### 3. Configure the backend (`api/.env`)

```bash
cd api
cp .env.example .env   # On Windows: copy .env.example .env
```

Edit **`api/.env`** and set at least:

| Variable | What to put |
|----------|-------------|
| `DATABASE_URL` | Your Supabase PostgreSQL URI (from step 2). |
| `PORT` | e.g. `5050` (default in many setups). |
| `JWT_SCRET` / `JWT_EXPIRED_IN` | Strong secret and expiry (see `.env.example`). |
| `BACKEND_LOCAL_URL` | Often `http://localhost:5050/api/v1/auth/` for local dev. |
| `BACKEND_LIVE_URL` | Your deployed API URL + `/api/v1/auth/` when you host the API. |
| `EMAIL_PASS` | Gmail [App Password](https://support.google.com/accounts/answer/185833) (for emails). |
| `GMAIL_APP_EMAIL` / `ADMIN_EMAIL` | Addresses used by the app for sending mail. |
| `CLOUND_NAME`, `API_KEY`, `API_SECRET` | From [Cloudinary](https://cloudinary.com/) dashboard. |

Install dependencies and sync the database schema:

```bash
npm install
npx prisma generate
```

Apply the schema to Supabase (pick **one** path that matches your workflow):

- **Fresh project / no migration history yet:**  
  ```bash
  npx prisma db push
  ```
- **If you use Prisma Migrate and have migration files:**  
  ```bash
  npx prisma migrate dev
  ```

Start the API:

```bash
npm run dev
```

Leave this terminal running. The API should listen on the port you set (e.g. **5050**).

### 4. Configure the frontend (root `.env`)

In the **project root** (not inside `api/`), create or edit **`.env`**:

```env
REACT_APP_API_BASE_URL=http://localhost:5050
```

Use your real API origin in production (no trailing slash required; the app adds `/api/v1` when needed).

Install and run the website:

```bash
cd ..          # back to Doctor-Appointment root
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Admin login (important)

- Normal users sign up as **patient** or **doctor** from the app.
- **Admin** users are **not** created from the sign-up form. You add them in the **`Auth`** table in the database with `role = admin` (and a hashed password consistent with how your app stores passwords), or use your own seed script.
- For a **safe demo** for employers or clients, set **`isDemo = true`** on an admin row. That account can **browse** everything but **cannot** create, update, or delete data through the API.

### 6. Common issues

| Problem | What to try |
|---------|-------------|
| Frontend cannot reach API | Check `REACT_APP_API_BASE_URL`, CORS, and that the API is running. |
| Database connection failed | Verify `DATABASE_URL`, password, `sslmode=require`, and Supabase project status. |
| Prisma errors after pulling changes | Run `npx prisma generate` again; then `db push` or `migrate dev`. |

---

## Video walkthrough

Older setup steps are also shown in this video (database provider may differ; **this README uses Supabase**):

[![YouTube](https://img.shields.io/badge/Watch_on-YouTube-red?logo=youtube)](https://youtu.be/L6cgb7I-Ap4)

---

## Screenshots

![DoctorOnCall overview](https://github.com/Ujjalzaman/Doctor-Appointment/assets/49386888/eeed56ce-3d9a-464d-91e5-588ea81ec5c0)

---

## Contributing

1. Fork the repo and clone your fork.  
2. Create a branch: `git checkout -b your-feature-name`  
3. Make changes, test with `npm start` (frontend) and `npm run dev` (API).  
4. Commit and push, then open a **Pull Request** with a clear description.

---

## Author & contact

**Ujjal Zaman**

- **Website / portfolio:** [ujjalzaman.com](https://ujjalzaman.com/)  
- **Email:** [ujjalzaman@gmail.com](mailto:ujjalzaman@gmail.com)

Have a product idea, a similar project, or want to collaborate? Reach out via the website or email — I’m happy to hear from you.

---

## License & thanks

This repository is shared for learning and portfolio use. If you ship a public product, review dependencies’ licenses and add your own license file if needed.

Thank you for reading — and happy building.
