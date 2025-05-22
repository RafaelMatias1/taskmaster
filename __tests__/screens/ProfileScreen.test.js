import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen';
import { AuthProvider } from '../../src/contexts/AuthContext';

// Mock do navigation para evitar erros
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('ProfileScreen', () => {
  it('renderiza dados do usuário e botões principais', () => {
    const { getByText } = render(
      <AuthProvider>
        <ProfileScreen navigation={{ navigate: mockNavigate }} />
      </AuthProvider>
    );

    // Verifica se os textos principais aparecem
    expect(getByText(/Meu Perfil/i)).toBeTruthy();
    expect(getByText(/Editar/i)).toBeTruthy();
    expect(getByText(/Excluir/i)).toBeTruthy();
    expect(getByText(/Sair/i)).toBeTruthy();
    expect(getByText(/Voltar/i)).toBeTruthy();
  });
});