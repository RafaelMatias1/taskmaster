import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provider que envolve a aplicação e fornece os métodos de autenticação
export function AuthProvider({ children }) {
  // Usuário autenticado atualmente
  const [user, setUser] = useState(null);
  // Estado de carregamento para feedback visual
  const [isLoading, setIsLoading] = useState(false);
  // Lista de usuários cadastrados (mock local)
  const [users, setUsers] = useState([]);

  // Função para login do usuário
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simula requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 500));
      // Busca usuário pelo e-mail e senha
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

  // Função para registrar novo usuário
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Verifica se já existe usuário com o mesmo e-mail
      if (users.find(u => u.email === email)) {
        throw new Error('E-mail já cadastrado');
      }
      // Cria novo usuário e adiciona à lista
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

  // Atualiza dados do usuário logado
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

  // Exclui usuário logado
  const deleteUser = () => {
    setUsers(prev => prev.filter(u => u.email !== user.email));
    setUser(null);
  };

  // Faz logout do usuário (mantém cadastro)
  const logout = () => {
    setUser(null);
  };

  // Provedor do contexto, expõe métodos e estados
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

// Hook para consumir o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}