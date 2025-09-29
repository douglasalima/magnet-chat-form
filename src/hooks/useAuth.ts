import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar usuário do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({ user: JSON.parse(storedUser), isLoading: false });
    } else {
      setAuthState({ user: null, isLoading: false });
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - aceita qualquer email/senha
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setAuthState({ user: mockUser, isLoading: false });
    return true;
  };

  const signup = (email: string, password: string, name: string) => {
    // Mock signup
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setAuthState({ user: mockUser, isLoading: false });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, isLoading: false });
    navigate('/login');
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: !!authState.user,
    login,
    signup,
    logout,
  };
};
