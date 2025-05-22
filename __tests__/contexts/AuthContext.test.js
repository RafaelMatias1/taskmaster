import React from 'react';
import { render, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../AuthContext';

// Componente de teste para consumir o contexto
function TestComponent() {
  const { user, isLoading, login, register, logout, updateUser, deleteUser } = useAuth();
  return null;
}

describe('AuthContext', () => {
  it('permite registrar, logar, atualizar, deslogar e deletar usuário', async () => {
    let contextValue;
    function Wrapper() {
      contextValue = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <Wrapper />
      </AuthProvider>
    );

    // Registrar novo usuário
    await act(async () => {
      await contextValue.register('Teste', 'teste@email.com', '123');
    });
    expect(contextValue.user).toMatchObject({ name: 'Teste', email: 'teste@email.com' });

    // Logout
    act(() => {
      contextValue.logout();
    });
    expect(contextValue.user).toBe(null);

    // Login
    await act(async () => {
      await contextValue.login('teste@email.com', '123');
    });
    expect(contextValue.user).toMatchObject({ name: 'Teste', email: 'teste@email.com' });

    // Atualizar usuário
    act(() => {
      contextValue.updateUser({ name: 'Novo Nome' });
    });
    expect(contextValue.user.name).toBe('Novo Nome');

    // Deletar usuário
    act(() => {
      contextValue.deleteUser();
    });
    expect(contextValue.user).toBe(null);
  });

  it('não permite registrar com e-mail já cadastrado', async () => {
    let contextValue;
    function Wrapper() {
      contextValue = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <Wrapper />
      </AuthProvider>
    );

    await act(async () => {
      await contextValue.register('Teste', 'teste@email.com', '123');
    });

    await expect(
      act(async () => {
        await contextValue.register('Outro', 'teste@email.com', '456');
      })
    ).rejects.toThrow();
  });

  it('não permite login com senha errada', async () => {
    let contextValue;
    function Wrapper() {
      contextValue = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <Wrapper />
      </AuthProvider>
    );

    await act(async () => {
      await contextValue.register('Teste', 'teste@email.com', '123');
    });

    await expect(
      act(async () => {
        await contextValue.login('teste@email.com', 'errada');
      })
    ).rejects.toThrow();
  });
});