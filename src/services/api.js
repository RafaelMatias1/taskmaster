let mockTasks = [
    {
      id: '1',
      title: 'Primeira tarefa',
      description: 'Exemplo de tarefa',
      status: 'todo',
    },
  ];
  
  export const api = {
    login: async (email, password) => {
      await new Promise(r => setTimeout(r, 500));
      if (email === 'teste@teste.com' && password === '123456') {
        return { token: 'fake-token', user: { name: 'Usuário Teste', email } };
      }
      throw new Error('Usuário ou senha inválidos');
    },
    register: async (name, email, password) => {
      await new Promise(r => setTimeout(r, 500));
      return { token: 'fake-token', user: { name, email } };
    },
    getTasks: async (token) => {
      await new Promise(r => setTimeout(r, 500));
      if (token !== 'fake-token') throw new Error('Token inválido');
      return mockTasks;
    },
    createTask: async (token, task) => {
      await new Promise(r => setTimeout(r, 500));
      if (token !== 'fake-token') throw new Error('Token inválido');
      const newTask = { ...task, id: Date.now().toString() };
      mockTasks.push(newTask);
      return newTask;
    },
    updateTask: async (token, updatedTask) => {
      await new Promise(r => setTimeout(r, 500));
      if (token !== 'fake-token') throw new Error('Token inválido');
      mockTasks = mockTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      return updatedTask;
    },
    deleteTask: async (token, id) => {
      await new Promise(r => setTimeout(r, 500));
      if (token !== 'fake-token') throw new Error('Token inválido');
      mockTasks = mockTasks.filter(t => t.id !== id);
      return { success: true };
    },
  };