import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]); // Armazena usuários cadastrados

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        setUser(found);
        return found;
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
      await new Promise(resolve => setTimeout(resolve, 500));
      if (users.find(u => u.email === email)) {
        throw new Error('E-mail já cadastrado');
      }
      const userData = { name, email, password, token: 'mock-token-' + Date.now() };
      setUsers(prev => [...prev, userData]);
      setUser(userData);
      return userData;
    } catch (error) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao registrar');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (newUserData) => {
    setUsers(prev =>
      prev.map(u =>
        u.email === user.email ? { ...u, ...newUserData } : u
      )
    );
    setUser(prev => ({
      ...prev,
      ...newUserData
    }));
  };

  const deleteUser = () => {
    setUsers(prev => prev.filter(u => u.email !== user.email));
    setUser(null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      deleteUser
    }}>
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