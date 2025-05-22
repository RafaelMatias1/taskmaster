import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'teste@email.com' && password === '123456') {
        const userData = { name: 'Usuário Teste', email, token: 'mock-token-123' };
        setUser(userData);
        return userData;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao fazer login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = { name, email, token: 'mock-token-456' };
      setUser(userData);
      return userData;
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
