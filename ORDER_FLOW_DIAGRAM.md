# Complete Order Flow Diagram

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SECRUM E-COMMERCE FLOW                         │
└─────────────────────────────────────────────────────────────────────────┘

1. AUTHENTICATION
   ┌──────────────┐
   │ User Visits  │
   │  /auth       │
   └──────┬───────┘
          │
          ├─► Register (creates user account)
          │        │
          │        └──► Login (gets auth token)
          │
          └──► Redirected to /shop
          
2. PRODUCT BROWSING
   ┌──────────────────┐
   │   /shop Page     │
   │  (Fetch from DB) │
   └────────┬─────────┘
            │
            ├─► Display all products
            │   (Images from Cloudinary)
            │
            ├─► User views product details
            │
            └─► Add to Cart
                    │
                    └──► Cart Store Updated
                         (Zustand state)

3. SHOPPING CART
   ┌─────────────────────────┐
   │  Cart Drawer Component  │
   │  (view, edit, delete)   │
   └──────────┬──────────────┘
              │
              ├─► Update quantities
              │
              ├─► Remove items
              │
              └─► PROCEED TO CHECKOUT
                      │
                      └──► Step 1: Review Items

4. CHECKOUT - STEP 1: REVIEW
   ┌────────────────────────┐
   │  Cart Review Page      │
   │  - Items              │
   │  - Quantities         │
   │  - Subtotal           │
   │  - Shipping: $10      │
   │  - Tax calculation    │
   │  - Total              │
   └────────────┬──────────┘
                │
                └─► PROCEED TO SHIPPING
                        │
                        └──► Step 2: Shipping

5. CHECKOUT - STEP 2: SHIPPING
   ┌──────────────────────────────┐
   │  Shipping Information Form   │
   │  ✓ Full Name                 │
   │  ✓ Phone Number              │
   │  ✓ Email                     │
   │  ✓ Street Address            │
   │  ✓ City                      │
   │  ✓ Province                  │
   │  ✓ Postal Code               │
   │  (Form Validation)           │
   └──────────┬───────────────────┘
              │
              └─► PROCEED TO PAYMENT
                      │
                      └──► Step 3: Payment

6. CHECKOUT - STEP 3: PAYMENT METHOD SELECTION
   ┌──────────────────────────────┐
   │  Payment Method Selection    │
   │  ┌──────────────────────┐    │
   │  │ ◉ Cash on Delivery   │    │
   │  │   Pay on delivery    │    │
   │  └──────────────────────┘    │
   │  ┌──────────────────────┐    │
   │  │ ○ Card Payment       │    │
   │  │   Credit/Debit card  │    │
   │  └──────────────────────┘    │
   │                              │
   │  [If Card selected]          │
   │  - Card Number               │
   │  - Expiry Date               │
   │  - CVC                       │
   └──────────┬───────────────────┘
              │
              └─► PLACE ORDER
                      │
                      ▼

7. ORDER PROCESSING
   ┌────────────────────────────────────────────┐
   │  /api/orders (POST Request)                │
   │                                            │
   │  1. Verify Auth Token                      │
   │  2. Validate Cart Items                    │
   │  3. Check Product Availability             │
   │  4. Generate Order Number                  │
   │  5. Deduct Stock from Inventory            │
   │  6. Create Order in Database               │
   │  7. Create Order Items                     │
   │  8. Save Shipping Information              │
   │  9. Save Payment Information               │
   │  10. Set Order Status:                     │
   │      - COD: "confirmed"                    │
   │      - Card: "pending"                     │
   └────────────┬───────────────────────────────┘
                │
                ├─► SUCCESS: Return Order Details
                │
                └─► FAILURE: Return Error Message
                        │
                        └──► User sees error
                             Checkout pauses

8. EMAIL NOTIFICATION
   ┌──────────────────────────────────────┐
   │  Send Order Confirmation Email       │
   │  via Resend                          │
   │                                      │
   │  To: customer@email.com              │
   │  From: noreply@secrum.com            │
   │  Subject: Order Confirmation         │
   │                                      │
   │  Email Contains:                     │
   │  - Order Number                      │
   │  - Items ordered                     │
   │  - Shipping Address                  │
   │  - Total Amount                      │
   │  - Expected Delivery                 │
   │  - Payment Method (COD)              │
   └──────────────┬───────────────────────┘
                  │
                  └──► Email Sent to Customer

9. REDIRECT TO SUCCESS PAGE
   ┌───────────────────────────────────────┐
   │  /order/success?orderId=SR-XXXXXX    │
   │                                       │
   │  Display:                             │
   │  ✓ Order Confirmed!                   │
   │  ✓ Order Number: SR-XXXXXX            │
   │  ✓ Items Summary                      │
   │  ✓ Shipping Address                   │
   │  ✓ Total Amount                       │
   │  ✓ "Check your email" message         │
   │  ✓ "Continue Shopping" link           │
   │                                       │
   │  Auto Actions:                        │
   │  - Clear cart                         │
   │  - Close cart drawer                  │
   └───────────┬──────────────────────────┘
               │
               └──► User can view order
                    or continue shopping

10. ORDER HISTORY & TRACKING
    ┌──────────────────────────┐
    │   /profile Page          │
    │   Order History Section  │
    │                          │
    │ Each Order Shows:        │
    │ - Order ID               │
    │ - Date Placed            │
    │ - Status (Confirmed)     │
    │ - Items Count            │
    │ - Total Amount           │
    │ - View Details Link      │
    └──────────┬───────────────┘
               │
               └─► Click "View Details"
                   → /order/success
                   (See full order info)

11. ADMIN DASHBOARD
    ┌─────────────────────────┐
    │   /admin/orders         │
    │                         │
    │ Admin Features:         │
    │ - View all orders       │
    │ - Search by ID/email    │
    │ - Filter by status      │
    │ - See order details     │
    │ - Send notifications    │
    │ - Update order status   │
    │ - View stats/charts     │
    └─────────────────────────┘

```

---

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE STRUCTURE                        │
└─────────────────────────────────────────────────────────────────┘

USER TABLE
├─ id (PK)
├─ email
├─ name
├─ password (hashed)
├─ createdAt
└─ isAdmin

    │
    └─ ONE-TO-MANY
        │
        ▼

ORDER TABLE
├─ id (PK)
├─ userId (FK → USER)
├─ orderNumber (unique)
├─ status (pending|confirmed|shipped|delivered)
├─ paymentMethod (cod|card)
├─ paymentStatus (pending|completed)
├─ shippingStatus (pending|shipped|delivered)
├─ subtotal
├─ shippingCost
├─ tax
├─ total
├─ createdAt
├─ updatedAt
│
├─ ONE-TO-MANY
│   │
│   ├─► ORDER_ITEMS TABLE
│   │   ├─ id (PK)
│   │   ├─ orderId (FK → ORDER)
│   │   ├─ productId (FK → PRODUCT)
│   │   ├─ quantity
│   │   └─ price (snapshot at time of order)
│   │
│   └─► SHIPPING_INFO TABLE
│       ├─ id (PK)
│       ├─ orderId (FK → ORDER)
│       ├─ name
│       ├─ phone
│       ├─ email
│       ├─ address
│       ├─ city
│       ├─ province
│       └─ postalCode
│
└─ ONE-TO-ONE
    │
    ▼

PAYMENT_INFO TABLE
├─ id (PK)
├─ orderId (FK → ORDER)
├─ paymentMethod (cod|card)
├─ amount
├─ status (pending|completed)
└─ transactionId (if card)

PRODUCT TABLE
├─ id (PK)
├─ name
├─ description
├─ category
├─ price
├─ image (Cloudinary URL)
├─ volume
├─ stock (decremented on order)
├─ rating
├─ reviewsCount
└─ createdAt

```

---

## Data Flow: From Cart to Database

```
┌───────────────────────────────────────────────────────────────────┐
│                    DATA FLOW VISUALIZATION                        │
└───────────────────────────────────────────────────────────────────┘

CLIENT SIDE (Browser)
══════════════════════

Cart Store (Zustand)
┌─────────────────┐
│ { items: [      │
│  { product,     │
│    quantity }   │
│ ]}              │
└────────┬────────┘
         │
         └─► User clicks "Place Order"
             │
             ├─► Validate cart items
             ├─► Validate shipping form
             ├─► Validate payment method
             │
             └─► POST /api/orders
                 ├─ items: [...cart items...]
                 ├─ subtotal: 5000
                 ├─ shippingCost: 500
                 ├─ tax: 550
                 ├─ paymentMethod: "cod"
                 └─ shippingInfo: {...}

                        │
                        │ (NETWORK)
                        ▼

SERVER SIDE (Backend)
════════════════════

POST /api/orders Handler
┌──────────────────────────────┐
│ 1. Decode JWT token          │
│ 2. Get userId from token     │
│ 3. Validate request body     │
│                              │
│ 4. FOR EACH ITEM:            │
│    - Get product from DB     │
│    - Check stock availability│
│    - Deduct stock quantity   │
│    - UPDATE product table    │
│                              │
│ 5. Create Order:             │
│    - Generate orderNumber    │
│    - Set status = "confirmed"│
│    - INSERT into orders      │
│    - INSERT order_items      │
│    - INSERT shipping_info    │
│    - INSERT payment_info     │
│                              │
│ 6. Send email notification   │
│                              │
│ 7. Return order details      │
└──────────────┬───────────────┘
               │
               ├─ Orders Table
               ├─ Order Items Table
               ├─ Shipping Info Table
               ├─ Payment Info Table
               └─ Products Table (stock updated)

                    │
                    │ (NETWORK)
                    ▼

CLIENT RECEIVES RESPONSE
════════════════════════

Success Response:
{
  order: {
    id: "uuid",
    orderNumber: "SR-123456",
    status: "confirmed",
    items: [...],
    total: 6050,
    shippingInfo: {...}
  }
}

Client Then:
├─► Show success page
├─► Clear cart store
├─► Close cart drawer
├─► Redirect to /order/success
└─► Display order confirmation

```

---

## Email Notification Flow

```
Order Created
    │
    ▼
Trigger: sendOrderConfirmationEmail()
    │
    ├─► Get order details from DB
    ├─► Get user email
    ├─► Create email HTML:
    │   ├─ Header with logo
    │   ├─ Greeting
    │   ├─ Order number
    │   ├─ Items table
    │   ├─ Totals breakdown
    │   ├─ Shipping address
    │   ├─ Payment method (COD)
    │   ├─ Expected delivery
    │   └─ Footer with contact
    │
    ├─► Call Resend API
    │   ├─ To: customer@email.com
    │   ├─ From: noreply@secrum.com
    │   ├─ Subject: Order Confirmation
    │   └─ HTML body
    │
    └─► Email Queued & Sent
        │
        ├─► Customer receives email
        └─► Admin can track in Resend dashboard
```

---

## Admin View Data Flow

```
Admin visits /admin/orders
    │
    ▼
Fetch all orders: GET /api/admin/orders
    │
    ├─► Verify admin access
    ├─► Query database:
    │   SELECT orders.*, users.*, order_items.*, products.*
    │   FROM orders
    │   JOIN users ON orders.userId = users.id
    │   JOIN order_items ON orders.id = order_items.orderId
    │   JOIN products ON order_items.productId = products.id
    │
    ▼
Display Dashboard:
├─ Total Orders Count
├─ Total Revenue
├─ Pending Orders
├─ Orders List Table:
│  ├─ Order ID
│  ├─ Customer Name
│  ├─ Date
│  ├─ Items Count
│  ├─ Amount
│  ├─ Status
│  └─ Actions (View, Send Email)
│
├─ Charts:
│  ├─ Orders by Status
│  └─ Revenue Trend
│
└─ Search & Filter:
   ├─ By order number
   ├─ By customer email
   └─ By status
```

---

## Stock Management

```
BEFORE ORDER:
├─ Product in database
├─ Current stock: 50 units
└─ User adds 5 to cart

DURING CHECKOUT:
├─ Check stock >= 5? YES ✓
├─ Proceed to order

DURING ORDER CREATION:
├─ Query product: SELECT stock FROM products
├─ Current stock: 50
├─ Calculate new stock: 50 - 5 = 45
├─ UPDATE products SET stock = 45 WHERE id = 'xyz'

AFTER ORDER:
├─ Product stock: 45 units
├─ Other users see updated stock
└─ If stock < 10, could trigger "Low Stock" alert
```

---

## Status Flow

```
USER PLACES ORDER (COD)
        │
        ▼
Order Status: "confirmed"  ◄── COD orders go straight to confirmed
        │
        ├─► User sees order success page
        ├─► Order appears in profile
        └─► Admin sees in dashboard

        │
        ▼
Admin updates status
        │
        ├─► READY TO SHIP: sends email to customer
        │   "Your order is ready, we'll ship soon"
        │
        ├─► SHIPPED: sends email with tracking
        │   "Your order shipped! Tracking: XYZ"
        │
        └─► DELIVERED: sends email
            "Your order delivered! Enjoy!"

CARD PAYMENT FLOW (Not implemented yet):
        │
        ▼
Order Status: "pending" (awaiting payment)
        │
        ├─► User sees payment pending
        ├─► Admin sees unpaid order
        │
        ├─► Payment confirmed
        │   Status: "confirmed"
        │
        └─► Proceeds as normal
```

---

This diagram shows the complete flow from user browsing through to order confirmation and admin management!
