# Secrum API Quick Reference

## Base URL
```
http://localhost:3000/api
```

---

## Authentication Endpoints

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "John Doe",
  "phone": "+923001234567"
}

Response: 201
{
  "user": { "id", "email", "name", "isAdmin" },
  "token": "jwt_token"
}
```

### Login
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "Password123!"
}

Response: 200
{ "user": {...}, "token": "jwt_token" }
```

### Get Current User
```bash
GET /auth/me
Authorization: Bearer token

Response: 200
{
  "user": {
    "id", "email", "name", "phone",
    "profileImage", "isAdmin", "isActive"
  }
}
```

### Logout
```bash
POST /auth/logout

Response: 200
{ "message": "Logged out successfully" }
```

---

## Product Endpoints

### List Products
```bash
GET /products?page=1&limit=20&category=serums&featured=true&search=botanical

Query Parameters:
- page: pagination page (default: 1)
- limit: items per page (default: 20)
- category: filter by category
- featured: true/false
- search: search in name/description

Response: 200
{
  "products": [
    {
      "id", "name", "slug", "price", "originalPrice",
      "stock", "category", "featured", "active",
      "images": [...], "rating", "reviewCount"
    }
  ],
  "pagination": {
    "page", "limit", "total", "pages"
  }
}
```

### Get Product Details
```bash
GET /products/:id

Response: 200
{
  "product": {
    "...product fields",
    "reviews": [
      { "id", "rating", "title", "comment", "user", "createdAt" }
    ]
  }
}
```

### Create Product (Admin Only)
```bash
POST /products
Authorization: Bearer admin_token
Content-Type: application/json

{
  "name": "Botanical Serum",
  "slug": "botanical-serum",
  "description": "Description here",
  "tagline": "Tagline",
  "price": 5999,
  "originalPrice": 6999,
  "stock": 50,
  "category": "serums",
  "featured": true,
  "images": [
    { "imageUrl": "https://...", "alt": "Alt text" }
  ]
}

Response: 201
{ "product": {...} }
```

### Update Product (Admin Only)
```bash
PUT /products/:id
Authorization: Bearer admin_token

{ "name", "description", "price", "stock", ... }

Response: 200
{ "product": {...} }
```

### Delete Product (Admin Only)
```bash
DELETE /products/:id
Authorization: Bearer admin_token

Response: 200
{ "message": "Product deleted successfully" }
```

---

## Review Endpoints

### Get Reviews (Approved Only)
```bash
GET /reviews?product_id=:id

Query Parameters:
- product_id: filter by product (optional)
- status: pending/approved/rejected (default: approved)

Response: 200
{
  "reviews": [
    {
      "id", "rating", "title", "comment",
      "userId", "productId", "status", "createdAt",
      "user": { "name", "profileImage" }
    }
  ]
}
```

### Submit Review (Authenticated)
```bash
POST /reviews
Authorization: Bearer token
Content-Type: application/json

{
  "productId": "uuid",
  "rating": 5,
  "title": "Amazing product!",
  "comment": "Detailed review..."
}

Response: 201
{ "review": {...} }
```

### Approve/Reject Review (Admin Only)
```bash
PUT /admin/reviews/:id
Authorization: Bearer admin_token

{ "status": "approved" | "rejected" }

Response: 200
{ "review": {...} }
```

### Delete Review (Admin Only)
```bash
DELETE /admin/reviews/:id
Authorization: Bearer admin_token

Response: 200
{ "message": "Review deleted successfully" }
```

---

## Order Endpoints

### Get User Orders
```bash
GET /orders
Authorization: Bearer token

Response: 200
{
  "orders": [
    {
      "id", "orderNumber", "status", "paymentMethod",
      "paymentStatus", "shippingStatus", "total",
      "items": [...], "shipping": {...}, "payment": {...}
    }
  ]
}
```

### Create Order
```bash
POST /orders
Authorization: Bearer token
Content-Type: application/json

{
  "items": [
    { "productId": "uuid", "quantity": 2, "price": 5999 }
  ],
  "subtotal": 11998,
  "shippingCost": 500,
  "tax": 0,
  "paymentMethod": "jazz_cash" | "cod",
  "shippingInfo": {
    "name": "Customer Name",
    "phone": "+923001234567",
    "email": "customer@example.com",
    "address": "123 Main St",
    "city": "Karachi",
    "province": "Sindh",
    "postalCode": "75000"
  }
}

Response: 201
{ "order": {...} }
```

### Get Order Details
```bash
GET /orders/:id
Authorization: Bearer token

Response: 200
{ "order": {...} }
```

### Update Order (Admin Only)
```bash
PUT /orders/:id
Authorization: Bearer admin_token

{
  "status": "pending|confirmed|processing|shipped|delivered",
  "paymentStatus": "pending|paid|failed",
  "shippingStatus": "pending|processing|shipped|delivered",
  "notes": "Optional notes"
}

Response: 200
{ "order": {...} }
```

---

## Payment Endpoints

### Initiate Payment
```bash
POST /payment/initiate
Authorization: Bearer token
Content-Type: application/json

{
  "orderId": "uuid",
  "paymentMethod": "jazz_cash" | "cod"
}

Response: 200
{
  "success": true,
  "message": "Payment initiated",
  "verificationUrl": "https://...",
  "redirectUrl": "https://..."
}
```

### Verify Payment (Jazz Cash)
```bash
POST /payment/verify
Authorization: Bearer token
Content-Type: application/json

{
  "orderId": "uuid",
  "transactionId": "transaction_id"
}

Response: 200
{
  "success": true,
  "message": "Payment verified successfully",
  "order": {...}
}
```

### Check Payment Status
```bash
GET /payment/verify?orderId=uuid

Response: 200
{
  "order": {
    "id", "orderNumber", "status",
    "paymentStatus", "paymentMethod", "total"
  }
}
```

---

## Wishlist Endpoints

### Get Wishlist
```bash
GET /wishlist
Authorization: Bearer token

Response: 200
{
  "wishlistItems": [
    {
      "id", "userId", "productId",
      "product": { "name", "price", "images" }
    }
  ]
}
```

### Add to Wishlist
```bash
POST /wishlist
Authorization: Bearer token

{ "productId": "uuid" }

Response: 201
{ "item": {...} }
```

### Remove from Wishlist
```bash
DELETE /wishlist/:id
Authorization: Bearer token

Response: 200
{ "message": "Removed from wishlist successfully" }
```

---

## Admin Endpoints

### Get All Orders
```bash
GET /admin/orders?status=pending&page=1&limit=20
Authorization: Bearer admin_token

Query Parameters:
- status: pending|confirmed|processing|shipped|delivered
- page: pagination page (default: 1)
- limit: items per page (default: 20)

Response: 200
{
  "orders": [...],
  "pagination": { "page", "limit", "total", "pages" }
}
```

---

## Error Responses

### 400 Bad Request
```json
{ "error": "Missing required fields" }
```

### 401 Unauthorized
```json
{ "error": "Unauthorized" }
```

### 403 Forbidden
```json
{ "error": "Forbidden - Admin access required" }
```

### 404 Not Found
```json
{ "error": "Product not found" }
```

### 409 Conflict
```json
{ "error": "Already in wishlist" }
```

### 500 Server Error
```json
{ "error": "Failed to fetch products" }
```

---

## Status Values

### Order Status
- `pending` - Initial state
- `confirmed` - Payment confirmed
- `processing` - Being prepared
- `shipped` - In transit
- `delivered` - Completed

### Payment Status
- `pending` - Awaiting payment
- `paid` - Payment received
- `pending_collection` - COD awaiting collection
- `failed` - Payment failed

### Shipping Status
- `pending` - Not yet shipped
- `processing` - Being packaged
- `shipped` - In transit
- `delivered` - Delivered to customer

### Review Status
- `pending` - Awaiting approval
- `approved` - Visible on product page
- `rejected` - Not approved

---

## Common Header Values

### Authentication
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Content Type
```
Content-Type: application/json
```

---

## Rate Limiting

No rate limiting configured. Implement as needed for production.

---

## Pagination

Default limit: 20 items per page
Maximum limit: 50 items per page (recommended)

Example:
```
/api/products?page=2&limit=10
```

---

## Version
API Version: 1.0.0

Last Updated: January 2025
