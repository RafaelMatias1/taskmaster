import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { useNavigation } from '@react-navigation/native';

// Obtém a largura da tela para responsividade
const { width } = Dimensions.get('window');

// Ordem dos status para navegação no Kanban
const statusOrder = ['todo', 'doing', 'done'];

// Componente de item de tarefa
export default function TaskListItem({ task, kanban, size = 'large' }) {
  const { removeTask, updateTask } = useTasks();
  const navigation = useNavigation();

  // Função para mover a tarefa para trás no Kanban
  const moveBack = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx > 0) {
      updateTask({ ...task, status: statusOrder[idx - 1] });
    }
  };

  // Função para mover a tarefa para frente no Kanban
  const moveForward = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx < statusOrder.length - 1) {
      updateTask({ ...task, status: statusOrder[idx + 1] });
    }
  };

  return (
    <View style={styles.item}>
      {/* Título da tarefa */}
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">{task.title}</Text>

      {/* Descrição aparece em tamanhos médio e grande */}
      {(size === 'medium' || size === 'large') && (
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
      )}

      {/* Botões só aparecem no tamanho grande */}
      {size === 'large' && (
        <View style={styles.buttonRow}>
          {/* Botão de mover para trás (Kanban) */}
          {kanban && (
            <TouchableOpacity
              onPress={moveBack}
              disabled={task.status === 'todo'}
              style={styles.iconButton}
              accessibilityLabel="Mover para trás"
              accessibilityState={{ disabled: task.status === 'todo' }}
              activeOpacity={0.7}
            >
              <Text style={[styles.moveText, task.status === 'todo' && styles.disabled]}>◀️</Text>
            </TouchableOpacity>
          )}

          {/* Botão de editar tarefa */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditTask', { task })}
            accessibilityLabel="Editar tarefa"
            activeOpacity={0.7}
          >
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>

          {/* Botão de excluir tarefa */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeTask(task.id)}
            accessibilityLabel="Excluir tarefa"
            activeOpacity={0.7}
          >
            <Text style={styles.deleteText}>❌</Text>
          </TouchableOpacity>

          {/* Botão de mover para frente (Kanban) */}
          {kanban && (
            <TouchableOpacity
              onPress={moveForward}
              disabled={task.status === 'done'}
              style={styles.iconButton}
              accessibilityLabel="Mover para frente"
              accessibilityState={{ disabled: task.status === 'done' }}
              activeOpacity={0.7}
            >
              <Text style={[styles.moveText, task.status === 'done' && styles.disabled]}>▶️</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginBottom: width * 0.04,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '100%',
    minHeight: width * 0.22,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: width * 0.037,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  iconButton: {
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    ...Platform.select({
      ios: { padding: 6 },
      android: { padding: 2 },
    }),
  },
  editButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffd600',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  editText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  deleteButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e53935',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  moveText: {
    fontSize: width * 0.055,
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.3,
  },
});