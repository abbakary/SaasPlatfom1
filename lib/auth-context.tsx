"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: UserLocation | null;
  createdAt: string;
}

interface AuthContextType {
  user: CustomerUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<CustomerUser>) => void;
  updateLocation: (location: UserLocation) => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  location: UserLocation | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in real app, this would be server-side)
const mockUsers: Array<CustomerUser & { password: string }> = [
  {
    id: "user-001",
    fullName: "John Mwalimu",
    email: "john@example.com",
    phone: "+255 712 345 678",
    password: "password123",
    location: {
      lat: -6.7924,
      lng: 39.2083,
      address: "Mikocheni, Dar es Salaam",
    },
    createdAt: "2023-06-15",
  },
];

const STORAGE_KEY = "medicare_customer_user";
const USERS_KEY = "medicare_registered_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get all registered users
  const getUsers = (): Array<CustomerUser & { password: string }> => {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      try {
        return [...mockUsers, ...JSON.parse(stored)];
      } catch {
        return mockUsers;
      }
    }
    return mockUsers;
  };

  // Save new user to localStorage
  const saveUser = (newUser: CustomerUser & { password: string }) => {
    const existing = localStorage.getItem(USERS_KEY);
    const users = existing ? JSON.parse(existing) : [];
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getUsers();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();
    
    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }

    // Check if phone already exists
    if (users.some((u) => u.phone === data.phone)) {
      return { success: false, error: "Phone number already registered" };
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      location: data.location,
      createdAt: new Date().toISOString().split("T")[0],
    };

    saveUser(newUser);

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (data: Partial<CustomerUser>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const updateLocation = (location: UserLocation) => {
    if (user) {
      const updatedUser = { ...user, location };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updateLocation,
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
