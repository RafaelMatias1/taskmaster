import React, { createContext, useState, useContext } from 'react';

// Cria o contexto de tarefas
const TaskContext = createContext();

// Provider que envolve a aplicação e fornece métodos para manipular tarefas
export function TaskProvider({ children }) {
  // Lista de tarefas
  const [tasks, setTasks] = useState([]);
  // Modo de visualização: 'list' ou 'kanban'
  const [viewMode, setViewMode] = useState('list');

  // Adiciona uma nova tarefa ao estado
  const addTask = (task) => setTasks(prev => [...prev, task]);

  // Atualiza uma tarefa existente pelo id
  const updateTask = (updatedTask) =>
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));

  // Remove uma tarefa pelo id
  const removeTask = (id) =>
    setTasks(prev => prev.filter(task => task.id !== id));

  // Provedor do contexto, expõe métodos e estados
  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      removeTask,
      viewMode,
      setViewMode
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook para consumir o contexto de tarefas
export function useTasks() {
  return useContext(TaskContext);
}