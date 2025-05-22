import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState({});
  const [viewMode, setViewMode] = useState('list');

  // Lista de tasks do usuário logado
  const tasks = user ? userTasks[user.email] || [] : [];

  // Adiciona task de boas-vindas só se o usuário não tiver nenhuma task
  useEffect(() => {
    if (user && tasks.length === 0) {
      setUserTasks(prev => ({
        ...prev,
        [user.email]: [
          {
            id: Date.now().toString(),
            title: 'Bem-vindo ao TaskMaster!',
            description: 'Toque no botão "+" para criar sua primeira tarefa. Você pode editar ou excluir tarefas a qualquer momento.',
            status: 'todo',
            welcome: true
          }
        ]
      }));
    }
  }, [user]); // Só roda quando o usuário loga

  const addTask = (task) => {
    if (!user) return;
    setUserTasks(prev => ({
      ...prev,
      [user.email]: [...(prev[user.email] || []), task]
    }));
  };

  const updateTask = (updatedTask) => {
    if (!user) return;
    setUserTasks(prev => ({
      ...prev,
      [user.email]: (prev[user.email] || []).map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  const removeTask = (id) => {
    if (!user) return;
    setUserTasks(prev => ({
      ...prev,
      [user.email]: (prev[user.email] || []).filter(task => task.id !== id)
    }));
  };

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

export function useTasks() {
  return useContext(TaskContext);
}