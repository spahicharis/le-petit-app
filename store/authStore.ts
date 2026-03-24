import { create } from 'zustand';

interface AuthState {
  /** True when the user has a valid session (logged in OR continuing as guest). */
  hasSession: boolean;
  /** True only when the user has authenticated with a real account. */
  isLoggedIn: boolean;
  /** Display name for logged-in users; null for guests. */
  userName: string | null;

  /** Guest flow – sets hasSession without requiring credentials. */
  continueAsGuest: () => void;
  /** Stub login – replace with real provider logic in Phase 4. */
  loginWithProvider: (provider: 'apple' | 'google') => void;
  /** Clear session and return to auth flow. */
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasSession: false,
  isLoggedIn: false,
  userName: null,

  continueAsGuest: () => set({ hasSession: true, isLoggedIn: false, userName: null }),

  loginWithProvider: (_provider) => {
    // Placeholder – integrate real OAuth in Phase 4.
    set({ hasSession: true, isLoggedIn: true, userName: 'Guest User' });
  },

  logout: () => set({ hasSession: false, isLoggedIn: false, userName: null }),
}));

