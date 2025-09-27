import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users storage
const MOCK_USERS_KEY = 'mock_users';
const CURRENT_USER_KEY = 'current_user';

const getMockUsers = (): User[] => {
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  return stored ? JSON.parse(stored) : [
    { id: '1', email: 'demo@example.com', name: 'Demo User' }
  ];
};

const setMockUsers = (users: User[]) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const useAuthData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getMockUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'Usuário não encontrado' };
    }
    
    setUser(foundUser);
    setCurrentUser(foundUser);
    setIsLoading(false);
    
    return { success: true };
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getMockUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'E-mail já cadastrado' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name
    };
    
    const updatedUsers = [...users, newUser];
    setMockUsers(updatedUsers);
    setUser(newUser);
    setCurrentUser(newUser);
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return { user, login, signup, logout, isLoading };
};