"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, UserRole } from "./types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  setMockUser: (role: UserRole) => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for different roles
const mockUsersByRole: Record<UserRole, User> = {
  attendee: {
    id: "user-1",
    firstName: "Jean",
    lastName: "Mugabo",
    email: "jean.mugabo@email.com",
    phone: "0788123456",
    role: "attendee",
    isVerified: true,
    createdAt: new Date("2024-01-15"),
  },
  organizer: {
    id: "org-1",
    firstName: "Marie",
    lastName: "Uwimana",
    email: "marie@eventspro.rw",
    phone: "0788654321",
    role: "organizer",
    isVerified: true,
    createdAt: new Date("2023-06-10"),
  },
  admin: {
    id: "admin-1",
    firstName: "Patrick",
    lastName: "Ishimwe",
    email: "admin@tikiti.rw",
    phone: "0788000001",
    role: "admin",
    isVerified: true,
    createdAt: new Date("2023-01-01"),
  },
  scanner: {
    id: "scanner-1",
    firstName: "Eric",
    lastName: "Habimana",
    email: "eric.scanner@eventspro.rw",
    phone: "0788111222",
    role: "scanner",
    isVerified: true,
    createdAt: new Date("2024-06-01"),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Find user by email in mock data
    const foundUser = Object.values(mockUsersByRole).find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    // Default to attendee for demo
    setUser(mockUsersByRole.attendee);
    setIsLoading(false);
    return true;
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      isVerified: false, // Would need email verification
      createdAt: new Date(),
    };
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const setMockUser = useCallback((role: UserRole) => {
    setUser(mockUsersByRole[role]);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        setMockUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
