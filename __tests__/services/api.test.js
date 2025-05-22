import { api } from '../../src/services/api';

describe('api mock service', () => {
  it('realiza login com sucesso', async () => {
    const res = await api.login('teste@teste.com', '123456');
    expect(res.token).toBe('fake-token');
    expect(res.user.email).toBe('teste@teste.com');
  });

  it('falha ao logar com credenciais inválidas', async () => {
    await expect(api.login('errado@teste.com', 'senha')).rejects.toThrow('Usuário ou senha inválidos');
  });

  it('registra novo usuário', async () => {
    const res = await api.register('Novo', 'novo@teste.com', 'abc');
    expect(res.token).toBe('fake-token');
    expect(res.user.name).toBe('Novo');
    expect(res.user.email).toBe('novo@teste.com');
  });

  it('busca tarefas com token válido', async () => {
    const tasks = await api.getTasks('fake-token');
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks[0]).toHaveProperty('title');
  });

  it('falha ao buscar tarefas com token inválido', async () => {
    await expect(api.getTasks('token-invalido')).rejects.toThrow('Token inválido');
  });

  it('cria uma nova tarefa', async () => {
    const task = { title: 'Nova', description: 'desc', status: 'todo' };
    const newTask = await api.createTask('fake-token', task);
    expect(newTask).toHaveProperty('id');
    expect(newTask.title).toBe('Nova');
  });

  it('atualiza uma tarefa existente', async () => {
    const tasks = await api.getTasks('fake-token');
    const updated = { ...tasks[0], title: 'Atualizada' };
    const res = await api.updateTask('fake-token', updated);
    expect(res.title).toBe('Atualizada');
  });

  it('deleta uma tarefa', async () => {
    const tasks = await api.getTasks('fake-token');
    const id = tasks[0].id;
    const res = await api.deleteTask('fake-token', id);
    expect(res.success).toBe(true);
    const newTasks = await api.getTasks('fake-token');
    expect(newTasks.find(t => t.id === id)).toBeUndefined();
  });
});