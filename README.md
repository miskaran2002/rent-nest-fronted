# RentNest Frontend 🏠
> "Find & List Rental Properties with Ease"

**RentNest Frontend** is a premium, fully responsive, and highly animated single-page client application built using Next.js (App Router) and TypeScript. It is designed to consume the RentNest REST API, allowing Tenants to browse verified listings and pay securely via Stripe, Landlords to manage their property listings (CRUD) and rental applications, and Admins to moderate users and view platform earnings.

---

## 🛠️ Tech Stack
- **Framework:** Next.js (v15/16 App Router)
- **Programming Language:** TypeScript (Mandatory)
- **Styling:** Tailwind CSS (v4) & Framer Motion (Smooth high-end animations)
- **State Management:** Zustand (Global Auth Session)
- **API Fetching:** Axios (with request interceptor for JWT token injection)
- **Payment Gateway:** Stripe.js (Stripe Checkout)
- **Toast Notifications:** React Hot Toast
- **Deployment Platform:** Vercel

---

## 📋 Mandatory Requirements Checklist (100% Satisfied)

- [x] **API Integration & Docs:** Consumed all backend endpoints. Provided a comprehensive `API_INTEGRATION.md` file in the root folder mapping components to endpoints.
- [x] **Consistent UI Error Handling:** Integrated global toast notifications (`react-hot-toast`) inside `app/layout.tsx`. All forms catch errors gracefully. Custom `error.tsx` (Error Boundary) and `not-found.tsx` are fully styled.
- [x] **20 Meaningful Commits:** Built sequentially with 20 clean, conventional commit messages.
- [x] **Admin Credentials:** Working test credentials provided clearly below.
- [x] **Payment Integration:** Integrated secure Stripe Checkout redirection flow with custom styled `payment/success` and `payment/cancel` pages handling automatic countdown redirections.

---

## 📂 Project Directory Structure
This project uses the modern Next.js App Router with **Route Groups** for logical layout separation without affecting URL paths:
```text
rent-nest-frontend/
├── app/
│   ├── (authGroup)/                 # Guest Auth Routes Group
│   │   ├── login/
│   │   │   └── page.tsx             # Animated Login page (Zustand Auth integration)
│   │   ├── register/
│   │   │   └── page.tsx             # Animated Register page (Role selector)
│   │   └── layout.tsx               # Auth shared glassmorphic split-screen layout
│   │
│   ├── (publicGroup)/               # Public Browsing Routes Group
│   │   ├── _components/
│   │   │   ├── propertyCard.tsx     # Reusable glassmorphic property card
│   │   │   ├── propertySkeleton.tsx # Pulsing loading skeleton cards
│   │   │   └── categoryFilter.tsx   # Horizontal category tag filter
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx         # Property details page (Reviews & booking modal)
│   │   │   └── page.tsx             # All listings browsable search & filter page
│   │   ├── about/
│   │   │   └── page.tsx             # Developer portfolio and platform about page
│   │   ├── layout.tsx               # Public layout wrapping Navbar and Footer
│   │   └── page.tsx                 # Premium landing Home Page
│   │
│   ├── (dashboardGroup)/            # Protected Role-Based Dashboards Group
│   │   ├── _components/
│   │   │   ├── DashboardSidebar.tsx # Dynamic responsive sidebar navigation
│   │   │   ├── AddPropertyModal.tsx # Landlord property Create/Edit modal
│   │   │   └── ReviewDialog.tsx     # Tenant leave review dialog (Star Rating input)
│   │   ├── tenant-dashboard/
│   │   │   ├── my-rentals/
│   │   │   │   └── page.tsx         # Tenant requests list & "Pay Now" Stripe button
│   │   │   ├── my-payments/
│   │   │   │   └── page.tsx         # Tenant completed transactions ledger table
│   │   │   └── page.tsx             # Tenant profile settings page (Name update)
│   │   ├── landlord-dashboard/
│   │   │   ├── my-properties/
│   │   │   │   └── page.tsx         # Landlord listed properties management (CRUD)
│   │   │   ├── rental-requests/
│   │   │   │   └── page.tsx         # Landlord incoming requests (Approve/Reject)
│   │   │   └── page.tsx             # Landlord dashboard index (Stats overview)
│   │   ├── admin-dashboard/
│   │   │   ├── users/
│   │   │   │   └── page.tsx         # Admin manage users (Search & Ban/Unban)
│   │   │   ├── categories/
│   │   │   │   └── page.tsx         # Admin manage categories CRUD
│   │   │   ├── rentals/
│   │   │   │   └── page.tsx         # Admin oversee all platform rentals
│   │   │   └── page.tsx             # Admin dashboard index (Overview stats card)
│   │   └── layout.tsx               # Dashboard grid wrapper (Sidebar + Content)
│   │
│   ├── payment/                     # Payment redirects
│   │   ├── success/
│   │   │   └── page.tsx             # Payment success countdown redirect page
│   │   └── cancel/
│   │       └── page.tsx             # Payment cancel redirect page
│   │
│   ├── services/                    # Unified modular API services
│   │   ├── user.service.ts
│   │   ├── rental.service.ts
│   │   ├── payment.service.ts
│   │   └── review.service.ts
│   │
│   ├── error.tsx                    # Graceful 500 error boundary handler
│   ├── loading.tsx                  # Global animated loading spinner page
│   ├── not-found.tsx                # Custom cybernetic 404 page
│   └── layout.tsx                   # Master root layout (Toaster wrapper)
│
├── components/                      # Shared UI components folder
├── lib/                             # Global Axios client instance config
├── store/                           # Global Zustand state stores
├── public/                          # Public images, assets, and icons
├── middleware.ts                    # Edge protected routing middleware (Cookie verification)
├── package.json
└── tsconfig.json

🔑 Test Credentials
The database has been seeded with three default roles for instant testing:
Role	Email	Password
Admin	admin@rentnest.com	admin123
Landlord	landlord@rentnest.com	landlord123
Tenant	tenant@rentnest.com	tenant123
💻 Local Installation & Setup
Clone the repository:
code
Bash
git clone https://github.com/your-username/rentnest-frontend.git
cd rentnest-frontend
Install dependencies:
code
Bash
pnpm install
Configure Environment Variables:
Create a .env.local file in the root directory:
code
Env
NEXT_PUBLIC_API_URL=🔑 Test Credentials
The database has been seeded with three default roles for instant testing:
Role	Email	Password
Admin	admin@rentnest.com	admin123
Landlord	landlord@rentnest.com	landlord123
Tenant	tenant@rentnest.com	tenant123
💻 Local Installation & Setup
Clone the repository:
code
Bash
git clone https://github.com/your-username/rentnest-frontend.git
cd rentnest-frontend
Install dependencies:
code
Bash
pnpm install
Configure Environment Variables:
Create a .env.local file in the root directory:
code
Env
NEXT_PUBLIC_API_URL=https://your-api-url.com
Start the Development Server:
code
Bash
pnpm dev
Open http://localhost:3000 to view the application.

Start the Development Server:
code
Bash
pnpm dev
Open http://localhost:3000 to view the application.
