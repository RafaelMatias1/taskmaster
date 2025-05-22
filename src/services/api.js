// Serviço mock para simular requisições de autenticação e tarefas

// Lista mock de tarefas para simular um backend
let mockTasks = [
  {
    id: '1',
    title: 'Primeira tarefa',
    description: 'Exemplo de tarefa',
    status: 'todo',
  },
];

// Objeto que simula uma API com métodos assíncronos
export const api = {
  // Simula login de usuário
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 500)); // Simula delay de rede
    if (email === 'teste@teste.com' && password === '123456') {
      return { token: 'fake-token', user: { name: 'Usuário Teste', email } };
    }
    throw new Error('Usuário ou senha inválidos');
  },

  // Simula registro de novo usuário
  register: async (name, email, password) => {
    await new Promise(r => setTimeout(r, 500));
    return { token: 'fake-token', user: { name, email } };
  },

  // Simula busca de tarefas do usuário autenticado
  getTasks: async (token) => {
    await new Promise(r => setTimeout(r, 500));
    if (token !== 'fake-token') throw new Error('Token inválido');
    return mockTasks;
  },

  // Simula criação de nova tarefa
  createTask: async (token, task) => {
    await new Promise(r => setTimeout(r, 500));
    if (token !== 'fake-token') throw new Error('Token inválido');
    const newTask = { ...task, id: Date.now().toString() };
    mockTasks.push(newTask);
    return newTask;
  },

  // Simula atualização de uma tarefa existente
  updateTask: async (token, updatedTask) => {
    await new Promise(r => setTimeout(r, 500));
    if (token !== 'fake-token') throw new Error('Token inválido');
    mockTasks = mockTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    return updatedTask;
  },

  // Simula exclusão de uma tarefa
  deleteTask: async (token, id) => {
    await new Promise(r => setTimeout(r, 500));
    if (token !== 'fake-token') throw new Error('Token inválido');
    mockTasks = mockTasks.filter(t => t.id !== id);
    return { success: true };
  },
};