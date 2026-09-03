# Employee Attendance Management System — MERN Stack

A focused assessment project implementing only the requested features:

- Employee Login & Registration
- Attendance Check-In / Check-Out
- Working Hours Calculation
- Leave Deduction Calculation
- HR Dashboard
- Employee Dashboard
- Attendance Status Tracking

## Stack
- **MongoDB** — database
- **Express.js** — REST API
- **React + Vite** — frontend
- **Node.js** — backend runtime
- JWT authentication + bcrypt password hashing

## Project structure
```text
employee-attendance-management-mern/
├── client/                  # React/Vite UI
├── server/                  # Express/MongoDB API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── scripts/
├── package.json
└── README.md
```

## Prerequisites
- Node.js 18+
- MongoDB 6+ running locally or a MongoDB Atlas connection

## Setup
1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGO_URI` and a strong `JWT_SECRET`.
3. From the project root run:
```bash
npm install
npm run install:all
```
4. Seed the HR account:
```bash
npm run seed --prefix server
```
5. Start both applications:
```bash
npm run dev
```
6. Open `http://localhost:5173`.

### Demo HR account
- Email: `hr@example.com`
- Password: `Admin@123`

Change/remove the demo account before production use.

## Database design
### users
Stores employee/HR identity, role, password hash and monthly salary.

### attendances
Stores one attendance document per employee/date, check-in/out timestamps, calculated working minutes and status (`Present`, `Late`, `Absent`, `Leave`). A compound unique index prevents duplicate daily attendance records.

## Business rules
- Check-in creates the current day's attendance record.
- Check-in after 10:00 local server time is marked `Late`.
- Check-out calculates working minutes from check-in to check-out.
- HR can mark a date as `Leave` or `Absent`.
- Leave deduction is calculated as `monthly salary / 30 × leave days` and displayed on the employee dashboard.

## Security
- Passwords are hashed using bcrypt.
- Authentication uses signed JWTs with an expiry.
- Protected routes require a Bearer token.
- HR-only endpoints enforce role authorization.
- Credentials and JWT secret are stored in environment variables, not source control.
- Mongoose schema validation and a unique email constraint are used.

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/attendance/today`
- `POST /api/attendance/check-in`
- `POST /api/attendance/check-out`
- `GET /api/attendance/mine`
- `GET /api/attendance/all` (HR)
- `POST /api/attendance/mark` (HR)
- `GET /api/dashboard/employee`
- `GET /api/dashboard/hr` (HR)
- `GET /api/dashboard/employees` (HR)

## Notes
This is an assessment implementation. For production deployment, add HTTPS, rate limiting, audit logs, stricter CORS, refresh-token/session strategy, centralized validation, and a production-grade secret-management solution.
