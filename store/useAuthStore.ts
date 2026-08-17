import { create } from 'zustand';

export type UserRole = 'TENANT' | 'LANDLORD' | 'ADMIN';

export type TUser = {
  userId: string;
  email: string;
  role: UserRole;
};

type TAuthStore = {
  user: TUser | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
};

// ব্রাউজারে অতিরিক্ত লাইব্রেরি ছাড়া নিরাপদে JWT পেলোড ডিকোড করার হেল্পার
const decodeToken = (token: string): TUser | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const useAuthStore = create<TAuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setAuth: (token) => {
    localStorage.setItem('rentnest_token', token);
    const decodedUser = decodeToken(token);
    set({ token, user: decodedUser, isLoading: false });
  },
  clearAuth: () => {
    localStorage.removeItem('rentnest_token');
    set({ token: null, user: null, isLoading: false });
  },
  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rentnest_token');
      if (token) {
        const decodedUser = decodeToken(token);
        if (decodedUser) {
          set({ token, user: decodedUser, isLoading: false });
          return;
        }
      }
    }
    set({ token: null, user: null, isLoading: false });
  },
}));