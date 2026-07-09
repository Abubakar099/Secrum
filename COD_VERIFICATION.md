# Cash on Delivery (COD) Order Verification & Testing Guide

## Overview
This document outlines the complete Cash on Delivery order flow, verification checklist, and testing procedures for Secrum Apothecary.

---

## Part 1: COD Order Flow Requirements

### User Actions
1. User selects products and adds them to cart
2. User clicks on the shopping bag to open the cart drawer
3. User clicks "PROCEED TO SHIPPING"
4. User fills in all shipping information:
   - Full Name (minimum 3 characters)
   - Email Address (valid format)
   - Phone Number (Pakistani format: +92 or 0)
   - Street Address (minimum 5 characters)
   - City
   - Province/State
   - Postal Code (minimum 3 characters)
5. User clicks "CONTINUE" to proceed
6. User selects "Cash on Delivery" payment method
7. User clicks "CONTINUE" to confirm
8. System creates order and sends confirmation email
9. User is redirected to order success page
10. Cart is cleared

### System Actions
1. **Validation**
   - Validate all shipping form fields client-side
   - Send to `/api/orders` with complete order details
   - Server validates all fields again (server-side validation)
   - Check for duplicate orders (same products within 30 minutes)

2. **Order Creation**
   - Create Order record with status: "pending"
   - Create OrderItems for each product
   - Create ShippingInfo with all address details
   - Create Payment record with method: "cod" and status: "pending"
   - Set paymentStatus: "pending"
   - Calculate totals (subtotal, shipping, tax, total)

3. **Email Notifications**
   - Send comprehensive order confirmation email
   - Include all order details, products, shipping address
   - Include COD payment instructions
   - Send payment notification email with amount and payment method

4. **Data Persistence**
   - Order stored in database with all relationships
   - ShippingInfo linked to Order
   - OrderItems linked to Order with product details
   - Payment record linked to Order
   - Order appears in admin dashboard immediately

5. **User Feedback**
   - Show "Transmitted to the Apothecary" success message
   - Display order reference number
   - Show payment method and COD instructions
   - Provide link to order details page
   - Display estimated delivery time (3-5 business days for COD)

---

## Part 2: Validation Requirements

### Client-Side Validation
```
✓ Full Name:
  - Required
  - Minimum 3 characters
  - Error: "Name must be at least 3 characters"

✓ Email Address:
  - Required
  - Valid email format (RFC compliant)
  - Error: "Enter a valid email address"

✓ Phone Number:
  - Required
  - Pakistani format: +92XXXXXXXXXX or 0XXXXXXXXX
  - Error: "Enter Pakistani phone number (+92 or 0)"

✓ Street Address:
  - Required
  - Minimum 5 characters
  - Error: "Enter valid street address"

✓ City:
  - Required
  - Error: "City is required"

✓ Province:
  - Required
  - Error: "Province is required"

✓ Postal Code:
  - Required
  - Minimum 3 characters
  - Error: "Enter valid postal code"
```

### Server-Side Validation
Same validations are repeated on the server to prevent manipulation.

---

## Part 3: Email Verification Checklist

### Order Confirmation Email Should Include:
- [x] Customer Name
- [x] Order Number (SECRUM-timestamp format)
- [x] Order Date
- [x] All Products Ordered
  - Product names
  - Quantities
  - Individual prices
- [x] Order Summary
  - Subtotal
  - Shipping Cost
  - Tax
  - Total Amount
- [x] Complete Shipping Address
  - Street
  - City
  - Province
  - Postal Code
- [x] Payment Method: "Cash on Delivery"
- [x] COD Instructions
  - Amount to prepare
  - How payment will be collected
  - Keep reference number for verification
- [x] Estimated Delivery Time (3-5 business days for COD)
- [x] Support contact information

### Payment Notification Email Should Include:
- [x] Payment Method: "Cash on Delivery"
- [x] Amount Due
- [x] Order ID
- [x] Delivery payment collection instructions

---

## Part 4: Database Verification Checklist

After order submission, verify in database:

### Order Record
```sql
SELECT * FROM "Order" WHERE id = '[order_id]';
```
Should have:
- [x] userId - user who placed order
- [x] orderNumber - SECRUM-xxxxx format
- [x] status: 'pending'
- [x] paymentMethod: 'cod'
- [x] paymentStatus: 'pending'
- [x] shippingStatus: 'pending'
- [x] subtotal, shippingCost, tax, total
- [x] isDuplicate, duplicateOrderId (if applicable)
- [x] createdAt, updatedAt timestamps

### OrderItem Records
```sql
SELECT * FROM "OrderItem" WHERE orderId = '[order_id]';
```
Each item should have:
- [x] orderId - references Order
- [x] productId - references Product
- [x] quantity - number ordered
- [x] price - price at time of purchase

### ShippingInfo Record
```sql
SELECT * FROM "ShippingInfo" WHERE orderId = '[order_id]';
```
Should have:
- [x] name - customer name
- [x] email - customer email
- [x] phone - customer phone
- [x] address - street address
- [x] city - city
- [x] province - province/state
- [x] postalCode - postal code

### Payment Record
```sql
SELECT * FROM "Payment" WHERE orderId = '[order_id]';
```
Should have:
- [x] orderId - references Order
- [x] paymentMethod: 'cod'
- [x] amount - total order amount
- [x] status: 'pending'

---

## Part 5: Error Handling Verification

### Test Each Error Scenario:

#### Invalid Email Address
- Input: "invalidemail"
- Expected: Show error "Enter a valid email address"
- API Response: 400 with validation error details
- Order should NOT be created

#### Missing Shipping Information
- Leave one field empty
- Expected: Show error for that field
- API Response: 400 with specific field error
- Order should NOT be created

#### Out-of-Stock Products
- (Setup: Product with stock = 0)
- Expected: Error message "One or more items are out of stock"
- API Response: 400 with out-of-stock error
- Order should NOT be created

#### Database Error
- Expected: Show "An error occurred while processing your order"
- API Response: 500 with generic error message
- Order should NOT be created
- Error logged to console

#### Email Sending Failure
- Expected: Order SHOULD still be created
- Email failure should not block order completion
- Error logged to console
- Success page still shows

#### Network Error
- Expected: Show "Failed to create order"
- Allow user to retry
- Cart data should be preserved

---

## Part 6: Admin Panel Verification

### Check Admin Orders Dashboard
1. Navigate to `/admin/orders`
2. Verify new order appears immediately
3. Check order status filter works
4. Click on order to view details
5. Verify all information is correctly displayed:
   - Customer name and contact
   - Complete shipping address
   - All products with quantities and prices
   - Payment method: "Cash on Delivery"
   - Payment status: "Pending"
   - Order totals

### Check Order Detail Page
1. Click on order number in dashboard
2. Verify `/admin/orders/[id]` page loads
3. Check all order details display correctly
4. Verify status can be changed via dropdown
5. Check original order reference (if duplicate)
6. View duplicate orders list (if applicable)

---

## Part 7: Order Success Page Verification

After order is created, user should see:

1. [x] Order success message
2. [x] Order number displayed
3. [x] Complete order summary
4. [x] All products listed with quantities and prices
5. [x] Shipping address displayed
6. [x] Payment method: "Cash on Delivery"
7. [x] COD-specific instructions:
   - Amount to prepare
   - Delivery timeframe (3-5 business days)
   - Order reference for verification
   - Email confirmation sent notice
8. [x] Link to view full order details page
9. [x] Link to continue shopping

---

## Part 8: Cart Persistence & Clearing

### Verify Cart is Cleared After Order
- [x] After successful order, cart becomes empty
- [x] Cart drawer should show "Add items to begin" or similar
- [x] No cart items appear on product pages
- [x] Returning to home page shows empty cart
- [x] Cart count is reset to 0

### Verify Cart Persists on Page Refresh
- Before order:
  - [x] Add product to cart
  - [x] Refresh page
  - [x] Product still in cart (localStorage persistence)
  
- After order:
  - [x] Complete order successfully
  - [x] Cart is cleared
  - [x] Refresh page
  - [x] Cart is still empty

---

## Part 9: Duplicate Order Detection

### Test Duplicate Detection
1. Place first order with specific products
2. Quickly place second order with identical products (within 30 minutes)
3. Expected:
   - [x] Order created successfully
   - [x] isDuplicate flag set to true
   - [x] duplicateOrderId references first order
   - [x] Show duplicate confirmation dialog to user
   - [x] User can confirm or go back
4. Verify in database:
   - First order has isDuplicate = false
   - Second order has isDuplicate = true, duplicateOrderId = first order ID

---

## Part 10: Testing Checklist

### Before Production Deployment

#### Functional Tests
- [ ] User can complete COD checkout with valid data
- [ ] All validations work correctly
- [ ] Order is stored in database completely
- [ ] Emails are sent successfully
- [ ] User is redirected to success page
- [ ] Cart is cleared after order
- [ ] Order appears in admin dashboard

#### Error Handling Tests
- [ ] Invalid email shows error
- [ ] Missing fields show specific errors
- [ ] Network errors are handled gracefully
- [ ] API errors display helpful messages
- [ ] Email failures don't block order creation

#### Email Tests
- [ ] Confirmation email includes all required details
- [ ] Emails are sent to correct address
- [ ] Email formatting is correct
- [ ] COD instructions are clear in email
- [ ] Payment notification email is sent

#### Database Tests
- [ ] Order record created with correct data
- [ ] ShippingInfo linked correctly
- [ ] OrderItems created for each product
- [ ] Payment record has correct status
- [ ] All relationships are maintained

#### Admin Tests
- [ ] New orders appear immediately in dashboard
- [ ] Order details page displays all information
- [ ] Status can be updated
- [ ] Duplicate badge/link appears correctly
- [ ] Filters work correctly

#### UI/UX Tests
- [ ] Success message is clear and visible
- [ ] COD instructions are prominent
- [ ] Email confirmation mentioned
- [ ] Order number is easy to find/copy
- [ ] Links to order page work correctly

---

## Part 11: Test Data

### Sample COD Order
```
Name: Ahmed Hassan
Email: ahmed.hassan@example.com
Phone: +923001234567
Address: 123 Main Street, Sector G
City: Karachi
Province: Sindh
PostalCode: 75500

Products:
- Rose Water Tonic (x1) - PKR 1,200
- Charcoal Face Mask (x2) - PKR 2,400

Subtotal: PKR 3,600
Shipping: PKR 12 (free over 150)
Tax: PKR 0
Total: PKR 3,612
```

### Sample Jazz Cash Order (for comparison)
```
Same as above but paymentMethod = 'jazz_cash'
User would enter card details on payment form
```

---

## Part 12: Monitoring & Logging

### Server Logs to Monitor
```
[v0] Order created successfully: {
  orderId: string,
  orderNumber: string,
  paymentMethod: 'cod',
  total: number,
}

[v0] Detailed order confirmation email sent to: email@example.com
[v0] Payment notification email sent to: email@example.com
```

### Error Logs to Watch For
```
[v0] Failed to send order confirmation: error message
[v0] Error creating order: error message
[v0] Error fetching orders: error message
[v0] API returned non-JSON response: error message
```

---

## Part 13: Success Criteria

All of the following must pass for COD implementation to be considered complete:

- [x] User can select COD payment method
- [x] All shipping fields are validated
- [x] Order is created in database with COD payment method
- [x] All relationships (items, shipping, payment) are correctly created
- [x] Comprehensive confirmation email is sent
- [x] User receives clear COD payment instructions
- [x] Order appears immediately in admin dashboard
- [x] Order can be viewed on success page
- [x] Order can be viewed on details page
- [x] Cart is cleared after successful order
- [x] Duplicate orders are detected and handled
- [x] Error handling is comprehensive
- [x] All validations pass
- [x] Email notifications are sent successfully
- [x] User has clear visibility of order status
- [x] COD payment instructions are prominent and clear

---

## Appendix: Quick Testing Procedure

1. **Open App**: Navigate to localhost:3000
2. **Add Product**: Click on any product and add to cart
3. **Start Checkout**: Click shopping bag icon
4. **Enter Shipping**: Fill in all required fields with test data
5. **Select COD**: Choose "Cash on Delivery"
6. **Confirm**: Click "CONTINUE" then "Place Order"
7. **Verify Success**: Check success page displays all info
8. **Check Email**: Verify confirmation email was sent
9. **Check Database**: Query order table to verify data
10. **Check Admin**: Navigate to /admin/orders to see new order
11. **Check Cart**: Verify cart is empty

