# Spec: Nnadidan Admin — Full Codebase Restructure

## Overview

Restructure the Nnadidan admin dashboard to remove Firebase entirely, switch to Supabase Storage for image uploads, fully implement all stubbed components, update the landing page UI, and ensure the admin works end-to-end with the FashionLine app backend.

---

## Goals

1. Remove Firebase dependency; replace with Supabase Storage
2. Fully implement all stubbed/broken components (NewProduct, Product, NewUser, User, ProductList, UserList)
3. Update the landing page to match the new design (hero with background image, Nnadidan branding, Login/Register/Test Login CTAs)
4. Add `agent.md` with coding guidelines (req,res,next pattern)
5. Fix broken imports (`@mui/material/Icon`, `@mui/material/Grid`)
6. Ensure image upload works end-to-end for FashionLine products

---

## Requirements

### R1 — Firebase Removal
- Delete `src/firebase.js`
- Remove `firebase` from `package.json`
- Add `@supabase/supabase-js` to `package.json`
- Create `src/supabase.js` — initializes Supabase client from env vars
- Create `src/utils/uploadToSupabase.js` — reusable upload utility
- Update all components that referenced Firebase to use the new utility

### R2 — Landing Page
- Replace `src/pages/landing/landing.jsx` with the new design from `mern-admin.html`
- Full-screen hero section with background image
- Fixed header with logo (bowl icon + "Nnadidan."), Login, Register, Test Login buttons
- "Registration is by invitation only" note
- Use Tailwind-compatible inline styles or a new `landing.css` (no Tailwind runtime required; replicate the design with plain CSS)
- PublicHeader component is no longer used on the landing page (it's built into the new hero design)
- Update `Forgot` and `Login` pages to use `PublicHeader` consistently

### R3 — NewProduct (Fully Implemented)
- File input triggers Supabase upload on form submit (not separately)
- Upload progress shown in UI
- On success: dispatches `addProduct` API call with the returned public URL as `img`
- Form fields: Image, Title, Description, Price, Categories (comma-separated), Stock (yes/no)
- Toast feedback on success and failure
- Navigate to `/products` on success

### R4 — Product Edit (Fully Implemented)
- Load product from Redux by `:productId`
- Editable fields pre-filled with current values
- File input for replacing image — uploads to Supabase on update
- Dispatches `updateProduct` API call
- Toast feedback

### R5 — NewUser (Fully Implemented)
- Form fields: Username, Full Name, Email, Password, Phone, Address, Gender, Active status
- Calls `POST /users` via `userRequest`
- Toast feedback, navigate to `/users` on success

### R6 — User Edit (Fully Implemented)
- Load user from API by `:userId` on mount
- Editable fields pre-filled
- File input for avatar — uploads to Supabase (`users` bucket)
- Calls `PUT /users/:id` via `userRequest`
- Toast feedback

### R7 — ProductList (Fully Implemented)
- Use real MUI `DataGrid` from `@mui/x-data-grid` (not `@mui/material/Grid`)
- Load products from Redux store (`useSelector`)
- Delete triggers `deleteProduct` API call
- Edit navigates to `/product/:id`

### R8 — UserList (Fully Implemented)
- Use real MUI `DataGrid` from `@mui/x-data-grid`
- Load users from API via `userRequest.get("/users")`
- Delete calls `DELETE /users/:id`
- Edit navigates to `/user/:id`

### R9 — ForgotPassword (Cleaned Up)
- Use `PublicHeader` component (no inline duplicated header)
- Calls `POST /auth/forgot-password` via `publicRequest`
- Toast feedback

### R10 — MUI Icon Imports (Fixed)
- All `@mui/material/Icon` imports replaced with proper named imports from `@mui/icons-material`
- Install `@mui/icons-material` package

### R11 — requestMethods.js (Dynamic Token)
- Token read dynamically per request so it reflects current auth state
- Use Axios interceptors instead of reading token once at module load time

### R12 — Env Variables
Required `.env` keys:
```
REACT_APP_BASEURL=http://localhost:5000/api
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

---

## File Structure After Restructure

```
src/
  app/
    store.js
  components/
    chart/
    featuredInfo/
    Loader/
    publicHeader/       ← used by Login, Register, Forgot
    sidebar/
    topbar/
    widgetLg/
    widgetSm/
  features/
    counter/
      apiCalls.js
      productRedux.js
      userRedux.js
  pages/
    forgot/
    home/
    landing/            ← new design
    login/
    newProduct/         ← fully implemented + Supabase upload
    newUser/            ← fully implemented
    product/            ← fully implemented + Supabase upload
    productList/        ← real DataGrid
    register/
    user/               ← fully implemented
    userList/           ← real DataGrid
  utils/
    ProtectedRoutes.js
    uploadToSupabase.js ← new
  supabase.js           ← new (replaces firebase.js)
  requestMethods.js     ← updated with interceptors
  App.js
  dummyData.js
agent.md
spec.md
```

---

## Implementation Tasks

- [x] Create `agent.md`
- [x] Create `spec.md`
- [x] Create `src/supabase.js`
- [x] Create `src/utils/uploadToSupabase.js`
- [x] Update `package.json` — remove firebase, add supabase + @mui/icons-material + @mui/x-data-grid
- [x] Update `requestMethods.js` with dynamic token interceptor
- [x] Rewrite `src/pages/landing/landing.jsx` + `landing.css`
- [x] Rewrite `NewProduct.jsx` with Supabase upload
- [x] Rewrite `Product.jsx` with Supabase upload + form wired up
- [x] Rewrite `NewUser.jsx` wired to API
- [x] Rewrite `User.jsx` loading from API + Supabase upload
- [x] Rewrite `ProductList.jsx` with real DataGrid + Redux
- [x] Rewrite `UserList.jsx` with real DataGrid + API
- [x] Fix `Forgot.jsx` to use PublicHeader
- [x] Fix all `@mui/material/Icon` imports across components (Sidebar, Topbar, FeaturedInfo, WidgetSm, Product, User)
- [x] Delete `src/firebase.js`
- [x] Export `logout` from `userRedux.js`
- [x] Create `.env.example`
