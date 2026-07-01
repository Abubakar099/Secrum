# Secrum Apothecary - eCommerce Backend Setup Guide

This document provides comprehensive setup instructions for the Secrum eCommerce backend.

## Overview

The Secrum eCommerce system is built with:
- **Next.js 16** with App Router
- **Prisma ORM** for database management
- **Supabase/PostgreSQL** for the database
- **JWT Authentication** with encrypted passwords
- **Resend** for email notifications
- **Jazz Cash & COD** payment methods

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (via Supabase or local)
- Environment variables configured

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

```bash
cp .env.example .env.local
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Supabase (optional if using Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"

# Payment (Jazz Cash)
JAZZ_CASH_MERCHANT_ID="your-merchant-id"
JAZZ_CASH_API_KEY="your-api-key"
JAZZ_CASH_API_SECRET="your-api-secret"

# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@secrum.local"
ADMIN_PASSWORD="secure-password"

# App Settings
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed initial data (admin user + sample products)
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Database Schema

### Core Models

#### User
- Manages user accounts with admin support
- Stores authentication credentials (hashed passwords)
- Fields: id, email, password, name, phone, profileImage, isAdmin, isActive

#### Product
- E-commerce products with inventory
- Fields: id, name, slug, description, tagline, price, originalPrice, stock, category, featured, active

#### ProductImage
- Multiple images per product with ordering
- Supports CDN integration (e.g., Cloudinary)

#### Order
- Complete order lifecycle management
- Fields: id, userId, orderNumber, status, paymentMethod, paymentStatus, shippingStatus, total

#### OrderItem
- Individual items within orders
- Links products to orders with quantity and price

#### Payment
- Payment tracking for Jazz Cash and COD
- Fields: id, orderId, paymentMethod, amount, transactionId, status, verificationUrl

#### ShippingInfo
- Shipping address and details
- Fields: id, orderId, name, phone, email, address, city, province, postalCode

#### Review
- Product reviews with moderation
- Fields: id, userId, productId, rating (1-5), title, comment, status (pending/approved/rejected)

#### Address
- User saved addresses
- Supports marking default address

#### WishlistItem
- User wishlists with unique constraint
- Prevents duplicate wishlist entries

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - List products (paginated, filterable)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Reviews

- `GET /api/reviews` - Get reviews (public, approved only)
- `POST /api/reviews` - Create review (authenticated users)
- `PUT /api/admin/reviews/[id]` - Approve/reject review (admin only)
- `DELETE /api/admin/reviews/[id]` - Delete review (admin only)

### Orders

- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order (admin only)

### Payments

- `POST /api/payment/initiate` - Initiate Jazz Cash or COD payment
- `POST /api/payment/verify` - Verify Jazz Cash payment
- `GET /api/payment/verify` - Check payment status

### Wishlist

- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/[id]` - Remove from wishlist

### Admin

- `GET /api/admin/orders` - List all orders (paginated)
- `PUT /api/admin/reviews/[id]` - Approve/reject reviews

## Authentication Flow

1. **Registration**: User provides email, password, name
   - Password is hashed with bcrypt (salt rounds: 10)
   - JWT token generated (7-day expiration)
   - Token set as secure HTTP-only cookie

2. **Login**: Email and password validation
   - Credentials compared against hashed password
   - JWT token generated on success
   - Token includes: userId, email, isAdmin

3. **Authorization**: Token validation on protected routes
   - Token decoded and verified
   - User ID extracted for data filtering
   - Admin flag checked for restricted endpoints

## Payment Integration

### Jazz Cash
- Requires merchant credentials in environment
- Returns verification URL for payment confirmation
- Payment status tracked in Payment model
- Email notification sent with payment instructions

### Cash on Delivery (COD)
- No external API integration needed
- Order marked as pending payment collection
- Payment collected at delivery
- Email sent with delivery instructions

## Email Notifications

The system sends automated emails for:

1. **Order Confirmation**
   - Sent immediately after order creation
   - Contains order number and total amount

2. **Payment Notification**
   - Sent based on payment method
   - Jazz Cash: Payment verification instructions
   - COD: Cash collection instructions

3. **Review Approval**
   - Sent when admin approves a review
   - Contains product name

All emails are sent via Resend service. Configure `RESEND_API_KEY` to enable.

## Security Considerations

1. **Password Hashing**: All passwords hashed with bcrypt before storage
2. **JWT Tokens**: Signed with secret key, validated on each request
3. **HTTP-Only Cookies**: Auth tokens stored securely (not accessible via JavaScript)
4. **Role-Based Access**: Admin endpoints check isAdmin flag
5. **Data Scoping**: Users can only access their own data
6. **Unique Constraints**: Prevent duplicate reviews and wishlist items

## Development Tips

### View Database
```bash
npm run db:studio
```

### Reset Database
```bash
npx prisma migrate reset
npm run db:seed
```

### Debug Logs
Check console logs with `[v0]` prefix for debugging information.

## Deployment

1. Set environment variables in production environment
2. Run database migrations: `npm run db:push`
3. Seed admin user if needed: `npm run db:seed`
4. Deploy to Vercel or your preferred platform

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database credentials
- Ensure database is running and accessible

### Email Not Sending
- Verify RESEND_API_KEY is set
- Check email format is valid
- Review Resend dashboard for bounce reasons

### Payment Issues
- Verify Jazz Cash credentials are correct
- Check merchant account status
- Test with test credentials first

## Next Steps

1. Build frontend components using the API endpoints
2. Implement shopping cart state management
3. Add product image uploads to Cloudinary
4. Setup admin dashboard for order and review management
5. Configure payment gateway testing credentials
6. Setup email template customization in Resend

## Support

For issues or questions:
1. Check logs for error messages with `[v0]` prefix
2. Verify all environment variables are set
3. Check database connection and migrations
4. Review API response status codes and error messages

---

**Last Updated**: 2024
**Version**: 1.0.0
