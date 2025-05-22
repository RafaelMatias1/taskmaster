import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Teste básico para garantir que o App renderiza sem erros
describe('App', () => {
  it('deve renderizar o componente principal sem crashar', () => {
    render(<App />);
  });
});