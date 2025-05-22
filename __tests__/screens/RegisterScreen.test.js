import React from 'react';
import { render } from '@testing-library/react-native';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { AuthProvider } from '../../src/contexts/AuthContext';

// Mock do navigation para evitar erros
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('RegisterScreen', () => {
  it('renderiza campos de nome, e-mail, senha e botão de registrar', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <RegisterScreen navigation={{ navigate: mockNavigate }} />
      </AuthProvider>
    );

    expect(getByPlaceholderText(/Digite seu nome/i)).toBeTruthy();
    expect(getByPlaceholderText(/Digite seu e-mail/i)).toBeTruthy();
    expect(getByPlaceholderText(/Digite sua senha/i)).toBeTruthy();
    expect(getByText(/Registrar/i)).toBeTruthy();
    expect(getByText(/Entrar/i)).toBeTruthy();
  });
});