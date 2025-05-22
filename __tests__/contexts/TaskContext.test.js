import React from 'react';
import { render, act } from '@testing-library/react-native';
import { TaskProvider, useTasks } from '../TaskContext';

// Componente de teste para consumir o contexto
function TestComponent() {
  const { tasks, addTask, updateTask, removeTask, viewMode, setViewMode } = useTasks();
  return (
    <>
      <Text testID="tasks">{JSON.stringify(tasks)}</Text>
      <Text testID="viewMode">{viewMode}</Text>
      {/* Os métodos são testados via act no teste */}
    </>
  );
}

describe('TaskContext', () => {
  it('adiciona, atualiza, remove tarefas e altera o modo de visualização', () => {
    let contextValue;
    function Wrapper() {
      contextValue = useTasks();
      return null;
    }

    render(
      <TaskProvider>
        <Wrapper />
      </TaskProvider>
    );

    // Adiciona uma tarefa
    act(() => {
      contextValue.addTask({ id: '1', title: 'Tarefa 1', status: 'todo' });
    });
    expect(contextValue.tasks.length).toBe(1);
    expect(contextValue.tasks[0].title).toBe('Tarefa 1');

    // Atualiza a tarefa
    act(() => {
      contextValue.updateTask({ id: '1', title: 'Tarefa 1 Editada', status: 'doing' });
    });
    expect(contextValue.tasks[0].title).toBe('Tarefa 1 Editada');
    expect(contextValue.tasks[0].status).toBe('doing');

    // Remove a tarefa
    act(() => {
      contextValue.removeTask('1');
    });
    expect(contextValue.tasks.length).toBe(0);

    // Altera o modo de visualização
    act(() => {
      contextValue.setViewMode('kanban');
    });
    expect(contextValue.viewMode).toBe('kanban');
  });
});