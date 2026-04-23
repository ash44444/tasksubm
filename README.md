# Seller Product Management API

Backend system built with Node.js, Express, MongoDB for Admin & Seller product management.

---

## Tech Stack

- Node.js + Express.js
- MongoDB Atlas
- JWT Authentication (Cookie-based)
- Zod Validation
- Winston Logger
- Jest + Supertest Testing

---

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

- Cookie-based JWT (httpOnly, secure)
- OR Bearer Token

```
Authorization: Bearer <token>
```

---

# ADMIN APIs

---

## 1. Admin Login

**POST** `/admin/login`

### Request

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Response

```json
{
  "message": "Login successful",
  "role": "admin",
  "token": "jwt_token"
}
```

---

## 🔹 2. Create Seller

**POST** `/admin/create-seller`

### Headers

```
Authorization: Bearer <admin_token>
```

### Request

```json
{
  "name": "Ashish",
  "email": "ashish@test.com",
  "mobile": "9999999999",
  "country": "India",
  "state": "Maharashtra",
  "skills": ["Node", "React"],
  "password": "123456"
}
```

### Errors

- 400 → Validation error
- 400 → Email already exists
- 401 → Unauthorized

---

## 🔹 3. List Sellers

**GET** `/admin/sellers?page=1`

### Response

```json
{
  "data": [],
  "page": 1
}
```

---

# SELLER APIs

---

## 🔹 1. Seller Login

**POST** `/seller/login`

### Request

```json
{
  "email": "ashish@test.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "role": "seller",
  "token": "jwt_token"
}
```

---

## 🔹 2. Logout

**POST** `/seller/logout`

---

# PRODUCT APIs

---

## 🔹 1. Add Product

**POST** `/product`

### Headers

```
Authorization: Bearer <seller_token>
```

### Request

```json
{
  "name": "Mouse",
  "description": "Test product",
  "brands": [
    {
      "name": "Dell",
      "detail": "Good",
      "image": "dell.jpg",
      "price": 1000
    },
    {
      "name": "HP",
      "detail": "Better",
      "image": "hp.jpg",
      "price": 2000
    }
  ]
}
```

---

## 🔹 2. Get Products

**GET** `/product?page=1`

### Headers

```
Authorization: Bearer <seller_token>
```

### Response

```json
{
  "data": [],
  "page": 1
}
```

---

## 🔹 3. View Product PDF

**GET** `/product/:id/pdf`

### Description

Returns downloadable PDF with:

- Product Name
- Description
- Brand Details
- Total Price

---

## 🔹 4. Delete Product

**DELETE** `/product/:id`

### Headers

```
Authorization: Bearer <seller_token>
```

---



❌ ERROR HANDLING

Standard response:

{
  "message": "Error message"
}
Status	Meaning
400	Validation Error
401	Unauthorized
403	Forbidden
404	Not Found
500	Server Error
🛡️ SECURITY FEATURES
JWT Authentication (Cookie + Bearer)
Role-based authorization
Zod validation
Helmet (secure headers)
Rate limiting
Mongo sanitize (NoSQL injection protection)
XSS protection
🧪 TESTING SCENARIOS (IMPORTANT)
❌ Without Token
POST /admin/create-seller

Response:

{
  "message": "Unauthorized - No token"
}
❌ Wrong Password
POST /seller/login

Response:

{
  "message": "Invalid password"
}
❌ Access Other Seller Product
DELETE /product/:id

Response:

{
  "message": "Forbidden"
}

npm run dev

# 🛡️ Security Features

- HTTP-only Cookies
- Helmet (secure headers)
- Rate Limiting
- Mongo Sanitize (NoSQL injection protection)
- XSS Protection

---

# 📬 Postman Collection

Import Postman collection for testing APIs.

---

# 📘 API Docs (Swagger)

```
http://localhost:5000/api-docs
```

---

# 🚀 Run Project

```
npm install
npm run dev
```

---

# 👨‍💻 Author

Ashish Maner
