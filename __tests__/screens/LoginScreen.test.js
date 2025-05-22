import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock do navigation para evitar erros
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('LoginScreen', () => {
  it('renderiza campos de e-mail e senha e botão de entrar', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </AuthProvider>
    );

    expect(getByPlaceholderText(/Digite seu e-mail/i)).toBeTruthy();
    expect(getByPlaceholderText(/Digite sua senha/i)).toBeTruthy();
    expect(getByText(/Entrar/i)).toBeTruthy();
    expect(getByText(/Registrar/i)).toBeTruthy();
  });
});