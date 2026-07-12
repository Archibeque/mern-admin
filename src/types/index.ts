// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  username: string;
  fullName?: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  img?: string;
  role?: string;
  isAdmin?: boolean;
  accessToken?: string;
  createdAt?: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  _id: string;
  title: string;
  desc?: string;
  img?: string;
  categories?: string[];
  price?: number | string;
  inStock?: boolean;
}

// ─── Order ───────────────────────────────────────────────────────────────────

export interface Order {
  _id: string;
  userId: string;
  amount: number;
  status: "pending" | "approved" | "delivered";
  createdAt?: string;
}

// ─── Redux State ─────────────────────────────────────────────────────────────

export interface UserState {
  currentUser: User | null | true; // true is legacy initial state — treated as unauthenticated
  isFetching: boolean;
  error: boolean;
}

export interface ProductState {
  products: Product[];
  isFetching: boolean;
  error: boolean;
}

export interface RootState {
  user: UserState;
  product: ProductState;
}

// ─── API / Forms ─────────────────────────────────────────────────────────────

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  token: string;
}

export interface NewProductForm {
  title: string;
  desc?: string;
  price?: string | number;
  inStock?: string | boolean;
  img?: string;
  categories?: string[];
}

export interface NewUserForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  gender?: string;
  active?: string;
}
