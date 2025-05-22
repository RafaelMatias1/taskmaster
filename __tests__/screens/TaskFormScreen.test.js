import React from 'react';
import { render } from '@testing-library/react-native';
import TaskFormScreen from '../../src/screens/TaskFormScreen';
import { TaskProvider } from '../../src/contexts/TaskContext';

// Mock do navigation e route para evitar erros
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockRoute = { params: {} };

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

describe('TaskFormScreen', () => {
  it('renderiza campos de título, descrição e botões', () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskProvider>
        <TaskFormScreen navigation={{ goBack: mockGoBack }} route={mockRoute} />
      </TaskProvider>
    );

    expect(getByText(/Nova Tarefa/i)).toBeTruthy();
    expect(getByPlaceholderText(/Digite o título/i)).toBeTruthy();
    expect(getByPlaceholderText(/Digite a descrição/i)).toBeTruthy();
    expect(getByText(/Salvar/i)).toBeTruthy();
    expect(getByText(/Cancelar/i)).toBeTruthy();
  });
});