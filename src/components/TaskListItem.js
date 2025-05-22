import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const statusOrder = ['todo', 'doing', 'done'];

export default function TaskListItem({ task, kanban, size = 'large' }) {
  const { removeTask, updateTask } = useTasks();
  const navigation = useNavigation();

  const moveBack = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx > 0) updateTask({ ...task, status: statusOrder[idx - 1] });
  };

  const moveForward = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx < statusOrder.length - 1) updateTask({ ...task, status: statusOrder[idx + 1] });
  };

  const showDetails = () => {
    Alert.alert(
      task.title || 'Sem título',
      task.description || 'Sem descrição',
      [{ text: 'Fechar', style: 'cancel' }]
    );
  };

  return (
    <View style={styles.item}>
      {/* Linha do título e setas */}
      <View style={styles.topRow}>
        {kanban && (
          <TouchableOpacity
            onPress={moveBack}
            style={[styles.iconButton, task.status === 'todo' && styles.disabled]}
            accessibilityLabel="Mover para trás"
            activeOpacity={0.7}
            disabled={task.status === 'todo'}
          >
            <Text style={styles.moveText}>◀️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.content}
          onPress={kanban ? showDetails : undefined}
          activeOpacity={kanban ? 0.6 : 1}
        >
          <Text
            style={styles.title}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {task.title}
          </Text>
          {/* Só mostra a descrição se NÃO estiver no kanban */}
          {!kanban && !!task.description && (
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {task.description}
            </Text>
          )}
        </TouchableOpacity>
        {kanban && task.status !== 'done' && (
          <TouchableOpacity
            onPress={moveForward}
            style={styles.iconButton}
            accessibilityLabel="Mover para frente"
            activeOpacity={0.7}
          >
            <Text style={styles.moveText}>▶️</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Linha dos botões de ação */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('EditTask', { task })}
          accessibilityLabel="Editar tarefa"
          activeOpacity={0.7}
        >
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => removeTask(task.id)}
          accessibilityLabel="Excluir tarefa"
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    width: '100%',
    minHeight: width * 0.18,
    marginBottom: width * 0.025,
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.015,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.032,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  iconButton: {
    minWidth: 28,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    padding: 2,
    marginHorizontal: 1,
  },
  moveText: {
    fontSize: width * 0.045,
    marginHorizontal: 0,
  },
  editText: {
    fontSize: width * 0.038,
    color: '#333',
  },
  deleteText: {
    fontSize: width * 0.038,
    color: '#e53935',
  },
  disabled: {
    opacity: 0.3,
  },
});