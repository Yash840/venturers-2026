# Venturers 2026 Backend API Docs (Frontend Guide)

## Overview
- Base URL (default): `http://localhost:3000`
- All routes are mounted under `/api`
- Content types:
  - `application/json` for admin/auth and panel routes
  - `multipart/form-data` for participant registration when uploading payment screenshot

## Auth Model
Backend accepts admin auth token from either:
1. HttpOnly cookie named `admin_token` (set by backend on sign-in)
2. `Authorization: Bearer <token>` header

Notes for frontend:
- CORS is configured with `credentials: true`, so cross-origin requests should use credentials when relying on backend cookies.
- Current frontend implementation also stores token in a client cookie and sends `Authorization` header, which is compatible with backend.

## Enums Used By API
### Permission
- `VIEW`
- `MODIFY`
- `SHARE_ACCESS`

### PassTier
- `Premium`
- `Customized`

## 1) Participant Endpoints

### POST `/api/participants/register`
Register a participant.

- Middleware:
  - `upload.single('paymentSS')`
  - Cloudinary upload middleware (`uploadImage`) that sets `paymentSSLink` when `paymentSS` file is provided
- Auth required: No

#### Request Body
Supports form fields (string values from form-data are accepted):
- `email` (string, required, unique)
- `firstName` (string, required)
- `lastName` (string, required)
- `institute` (string, required)
- `course` (string, required)
- `phoneNumber` (string, required)
- `passTier` (enum: `Premium` | `Customized`, required)
- `eventsApplied` (array of strings OR comma-separated string)
- `billingAmount` (number)
- `paymentSSLink` (string URL; auto-filled if `paymentSS` file is uploaded)
- `paymentSS` (file, optional)

#### Success Response
- Status: `201`
- Body: Created participant record

Example:
```json
{
  "id": 12,
  "email": "user@example.com",
  "firstName": "Ava",
  "lastName": "Shaw",
  "institute": "ABC Institute",
  "course": "B.Tech",
  "phoneNumber": "9876543210",
  "passTier": "Premium",
  "eventsApplied": ["Hackathon", "Workshop"],
  "billingAmount": 1499,
  "isVerified": false,
  "paymentSSLink": "https://res.cloudinary.com/..."
}
```

#### Error Responses
- `500` server error

## 2) Admin Auth Endpoints

### POST `/api/admin/auth/signup`
Creates a pending admin access request.

- Auth required: No

#### Request Body
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

#### Success Response
- Status: `201`
```json
{
  "message": "Sign up successful. Wait for super-admin or authorized admin to approve your request."
}
```

#### Error Responses
- `400` missing email/password
- `400` email already exists
- `500` server error

### POST `/api/admin/auth/signin`
Signs in as super-admin (from env credentials) or approved admin.

- Auth required: No

#### Request Body
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

#### Success Response
- Status: `200`
- Sets cookie: `admin_token` (HttpOnly)
- Also returns token in response body

Admin example:
```json
{
  "message": "Admin login successful",
  "token": "<jwt>"
}
```

Super-admin example:
```json
{
  "message": "Super Admin login successful",
  "token": "<jwt>"
}
```

JWT payload includes:
- `id`
- `email`
- `role` (`admin` or `super-admin`)
- `permissions` (Permission[])
- `exp`

#### Error Responses
- `400` missing email/password
- `401` invalid credentials
- `403` access request pending approval
- `500` server error

### POST `/api/admin/auth/logout`
Clears backend auth cookie.

- Auth required: No

#### Success Response
- Status: `200`
```json
{
  "message": "Logged out successfully"
}
```

## 3) Admin Panel Endpoints
All endpoints below require authentication (`requireAuth`).

Authentication accepted via:
- `admin_token` cookie, or
- `Authorization: Bearer <token>`

### GET `/api/admin/panel/participants`
Fetch all participants.

- Required permission: `VIEW`

#### Success Response
- Status: `200`
- Body: `Participant[]`

#### Error Responses
- `401` no token / unauthorized
- `403` missing `VIEW` permission
- `400` invalid token
- `500` server error

### PATCH `/api/admin/panel/participants/:id/verify`
Toggle participant verification status.

- Required permission: `MODIFY`

#### Path Params
- `id` (number)

#### Success Response
- Status: `200`
```json
{
  "message": "Participant verification status toggled",
  "participant": {
    "id": 12,
    "isVerified": true
  }
}
```

#### Error Responses
- `400` invalid participant ID
- `401` unauthorized
- `403` missing `MODIFY` permission
- `404` participant not found
- `500` server error

### GET `/api/admin/panel/pending-requests`
Fetch pending admin requests.

- Required permission: `SHARE_ACCESS`

#### Success Response
- Status: `200`
```json
[
  {
    "id": 4,
    "email": "newadmin@example.com",
    "permissions": ["VIEW"],
    "isApproved": false
  }
]
```

#### Error Responses
- `401` unauthorized
- `403` missing `SHARE_ACCESS` permission
- `400` invalid token
- `500` server error

### POST `/api/admin/panel/grant-access/:id`
Approve admin and optionally assign permissions.

- Required permission: `SHARE_ACCESS`

#### Path Params
- `id` (number admin ID)

#### Request Body
- Optional:
```json
{
  "permissions": ["VIEW", "MODIFY", "SHARE_ACCESS"]
}
```
- If omitted, existing permissions are preserved.

#### Success Response
- Status: `200`
```json
{
  "message": "Access granted successfully",
  "admin": {
    "id": 4,
    "email": "newadmin@example.com",
    "isApproved": true,
    "permissions": ["VIEW", "MODIFY"]
  }
}
```

#### Error Responses
- `400` invalid admin ID
- `401` unauthorized
- `403` missing `SHARE_ACCESS` permission
- `404` admin not found
- `500` server error

## Frontend Integration Checklist
1. Set `VITE_API_BASE_URL` to backend host (for example `http://localhost:3000`).
2. Send credentials when required (`withCredentials: true` already configured in frontend axios instance).
3. Persist token from sign-in response if using Authorization header flow.
4. Gate UI actions by `permissions` from JWT payload.
5. Handle `401`, `403`, and `400 Invalid token` by redirecting to sign-in and clearing local auth state.
