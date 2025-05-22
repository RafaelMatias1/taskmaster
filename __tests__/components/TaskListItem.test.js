import React from 'react';
import { render } from '@testing-library/react-native';
import TaskListItem from '../../src/components/TaskListItem';

describe('TaskListItem', () => {
  it('deve renderizar o título da tarefa', () => {
    const task = { id: '1', title: 'Teste', description: 'Descrição', status: 'todo' };
    const { getByText } = render(<TaskListItem task={task} kanban={false} />);
    expect(getByText('Teste')).toBeTruthy();
  });
});