import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { useNavigation } from '@react-navigation/native';

const statusOrder = ['todo', 'doing', 'done'];

export default function TaskListItem({ task, kanban }) {
  const { removeTask, updateTask } = useTasks();
  const navigation = useNavigation();

  const moveBack = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx > 0) {
      updateTask({ ...task, status: statusOrder[idx - 1] });
    }
  };

  const moveForward = () => {
    const idx = statusOrder.indexOf(task.status);
    if (idx < statusOrder.length - 1) {
      updateTask({ ...task, status: statusOrder[idx + 1] });
    }
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
      <View style={styles.buttonRow}>
        {kanban && (
          <TouchableOpacity onPress={moveBack} disabled={task.status === 'todo'}>
            <Text style={[styles.moveText, task.status === 'todo' && styles.disabled]}>◀️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditTask', { task })}
        >
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeTask(task.id)}
        >
          <Text style={styles.deleteText}>❌</Text>
        </TouchableOpacity>
        {kanban && (
          <TouchableOpacity onPress={moveForward} disabled={task.status === 'done'}>
            <Text style={[styles.moveText, task.status === 'done' && styles.disabled]}>▶️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '100%',
    minHeight: 90,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  editButton: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: '#ffd600',
    borderRadius: 5,
  },
  editText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: '#e53935',
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  moveText: {
    fontSize: 20,
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.3,
  },
});