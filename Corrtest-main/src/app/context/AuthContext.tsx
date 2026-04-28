import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'polly_cesl_demo_auth';
const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'PollyCESL2026';

interface AuthContextValue {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialAuthState() {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuthState);

  const signIn = useCallback((email: string, password: string) => {
    const ok = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
    if (ok) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      }
    }
    return ok;
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      signIn,
      signOut,
    }),
    [isAuthenticated, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const demoCredentials = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
};
