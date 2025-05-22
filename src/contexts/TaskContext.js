import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // Adicione esta linha

  const addTask = (task) => setTasks(prev => [...prev, task]);
  const updateTask = (updatedTask) =>
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  const removeTask = (id) =>
    setTasks(prev => prev.filter(task => task.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, viewMode, setViewMode }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}