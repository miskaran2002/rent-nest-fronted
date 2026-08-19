# RentNest Frontend API Integration Mapping 🌍

This file maps the Next.js frontend components and routes to their respective backend API endpoints.

## 🔑 Authentication Endpoints
- **User Registration:**
  - Route: `/register`
  - Component: `app/(authgroup)/register/page.tsx`
  - API Call: `POST /api/auth/register` (Registers Tenant/Landlord)
- **User Login:**
  - Route: `/login`
  - Component: `app/(authgroup)/login/page.tsx`
  - API Call: `POST /api/auth/login` (Returns JWT access token)
- **Get Current User:**
  - Hook: `initializeAuth` inside Zustand store
  - File: `store/useAuthStore.ts`
  - API Call: `GET /api/auth/me`

## 👤 Profile Management
- **Manage Profile (Get Details):**
  - Route: `/tenant-dashboard` and `/landlord-dashboard/profile`
  - API Call: `GET /api/auth/me`
- **Update Profile Name:**
  - Component: `app/(dashboardGroup)/tenant-dashboard/page.tsx`
  - API Call: `PATCH /api/users/updateProfile`

## 🏠 Property Browsing & Booking
- **Get All Properties (Public Browse):**
  - Route: `/properties`
  - Component: `app/(publicGroup)/properties/page.tsx`
  - API Call: `GET /api/properties` (Supports `searchTerm`, `location`, `minPrice`, `maxPrice`, `categoryId`)
- **Get Property Details:**
  - Route: `/properties/[id]`
  - Component: `app/(publicGroup)/properties/[id]/page.tsx`
  - API Call: `GET /api/properties/:id`
- **Submit Rental Request:**
  - Component: Booking Modal inside `/properties/[id]/page.tsx`
  - API Call: `POST /api/rentals` (Submits a PENDING request)

## 💳 Payments & Transactions (Stripe)
- **Initiate Payment (Stripe Session):**
  - Component: `MyRentalsPage` ("Proceed to Payment" CTA) at `/tenant-dashboard/my-rentals`
  - API Call: `POST /api/payments/create` (Returns Stripe checkoutUrl)
- **Confirm Payment (Webhook):**
  - API Call: `POST /api/payments/confirm` (Stripe automated webhook listener)
- **Payment Transaction History:**
  - Route: `/tenant-dashboard/my-payments`
  - API Call: `GET /api/payments`

## ✍️ Reviews
- **Submit Property Review:**
  - Component: `ReviewDialog` at `app/(dashboardGroup)/_components/ReviewDialog.tsx`
  - API Call: `POST /api/reviews`
- **Get Property Reviews:**
  - Component: Reviews list section inside `/properties/[id]/page.tsx`
  - API Call: `GET /api/reviews/property/:propertyId`

## 🏘️ Landlord Management
- **Add Property Listing:**
  - Component: `AddPropertyModal` at `app/(dashboardGroup)/_components/AddPropertyModal.tsx`
  - API Call: `POST /api/properties`
- **Edit Property Listing:**
  - Component: `AddPropertyModal` (Edit Mode)
  - API Call: `PATCH /api/properties/:id`
- **Delete Property Listing:**
  - Component: `MyPropertiesPage` at `/landlord-dashboard/my-properties`
  - API Call: `DELETE /api/properties/:id`
- **Approve/Reject Rental Requests:**
  - Component: `RentalRequestsPage` at `/landlord-dashboard/rental-requests`
  - API Call: `PATCH /api/rentals/:id/status`

## 🛡️ Admin Management
- **Dashboard Overview Stats:**
  - Route: `/admin-dashboard`
  - API Call: `GET /api/admin/overview` (Total users, properties, rentals, and earnings)
- **Manage Platform Users:**
  - Route: `/admin-dashboard/users`
  - API Call: `GET /api/users/admin/users` (Get list) & `PATCH /api/users/admin/users/:id` (Ban/Unban)
- **Manage Categories:**
  - Route: `/admin-dashboard/categories`
  - API Call: `GET /api/categories` (Get list), `POST /api/categories` (Create), & `DELETE /api/categories/:id` (Delete)