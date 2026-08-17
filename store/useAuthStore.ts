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
    // ১. লোকাল স্টোরেজে সেভ করা (ক্লায়েন্ট সাইড রিকোয়েস্টের জন্য)
    localStorage.setItem('rentnest_token', token);
    
    // ২. ⚠️ ব্রাউজার কুকিতে সেভ করা (Next.js Middleware সার্ভার সাইড রিডিংয়ের জন্য)
    document.cookie = `rentnest_token=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;

    const decodedUser = decodeToken(token);
    set({ token, user: decodedUser, isLoading: false });
  },
  clearAuth: () => {
    localStorage.removeItem('rentnest_token');
    
    // কুকি মুছে ফেলা
    document.cookie = 'rentnest_token=; path=/; max-age=0';

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