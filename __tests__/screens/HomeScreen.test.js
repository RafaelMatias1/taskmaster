import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { AuthProvider } from '../../contexts/AuthContext';
import { TaskProvider } from '../../contexts/TaskContext';

// Mock do useNavigation para evitar erros de navegação
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('HomeScreen', () => {
  it('renderiza elementos principais', () => {
    const { getByText } = render(
      <AuthProvider>
        <TaskProvider>
          <HomeScreen />
        </TaskProvider>
      </AuthProvider>
    );

    // Verifica se os textos principais aparecem
    expect(getByText(/Bem-vindo/i)).toBeTruthy();
    expect(getByText(/Perfil/i)).toBeTruthy();
    expect(getByText(/Lista/i)).toBeTruthy();
    expect(getByText(/Kanban/i)).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
  });
});