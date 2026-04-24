#  Seller Product Management API

Backend system for Admin & Seller product management built with Node.js, Express, MongoDB.

---

##  Tech Stack

* Node.js + Express.js
* MongoDB Atlas
* JWT Authentication (Cookie + Bearer)
* Zod Validation
* Winston Logger
* PDFKit (PDF generation)

---

##  Base URL

```
http://localhost:5000/api
```

---

#  Authentication (IMPORTANT)

### Supported:

* Cookie-based (automatic)
* Bearer Token (manual)

### Header (if using Bearer):

```
Authorization: Bearer <token>
```

---

#  POSTMAN IMPORTANT NOTE

If APIs work **without token**, it's because:

 Postman auto-sends cookies

### Fix:

* Click **Cookies (top right in Postman)**
* Delete `token`
* Then test again

---

#  POSTMAN TESTING FLOW (STEP BY STEP)

### 1️⃣ Admin Login

**POST** `/admin/login`

Body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

 This sets cookie automatically

---

### 2️⃣ Create Seller

**POST** `/admin/create-seller`

Body:

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

 Requires Admin Auth

---

### 3️⃣ Get Sellers (Pagination)

**GET** `/admin/sellers?page=1`

---

### 4️⃣ Seller Login

**POST** `/seller/login`

```json
{
  "email": "ashish@test.com",
  "password": "123456"
}
```

---

### 5️⃣ Add Product

**POST** `/product`

```json
{
  "name": "Mouse",
  "description": "Test",
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

### 6️⃣ Get Products

**GET** `/product?page=1`

---

### 7️⃣ View Product PDF

**GET** `/product/:id/pdf`

  Returns PDF file

---

### 8️⃣ Delete Product

**DELETE** `/product/:id`

---

#   ERROR HANDLING

Standard response:

```json
{
  "message": "Error message"
}
```

| Status | Meaning          |
| ------ | ---------------- |
| 400    | Validation Error |
| 401    | Unauthorized     |
| 403    | Forbidden        |
| 404    | Not Found        |
| 500    | Server Error     |

---

#  SECURITY FEATURES

* JWT Authentication (Cookie + Bearer)
* Role-based authorization
* Zod validation
* Helmet (secure headers)
* Rate limiting
* Mongo sanitize (NoSQL injection protection)
* XSS protection

---

#  TESTING SCENARIOS (IMPORTANT)

###  Without Token

```
POST /admin/create-seller
```

Response:

```json
{
  "message": "Unauthorized - No token"
}
```

---

###  Wrong Password

```
POST /seller/login
```

Response:

```json
{
  "message": "Invalid password"
}
```

---

###  Access Other Seller Product

```
DELETE /product/:id
```

Response:

```json
{
  "message": "Forbidden"
}
```

---

#  RUN PROJECT

```
npm install
npm run dev
```

---

#  Author

Ashish Maner
