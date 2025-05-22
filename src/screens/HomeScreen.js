import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskListItem from '../components/TaskListItem';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { tasks, viewMode, setViewMode, addTask } = useTasks();

  // Estado para o tamanho de cada coluna
  const [columnSizes, setColumnSizes] = useState({
    todo: 'small',    // 'small', 'medium', 'large'
    doing: 'small',
    done: 'small'
  });

  useEffect(() => {
    // Só cria a task de boas-vindas se não houver nenhuma task de boas-vindas já criada
    if (!tasks.some(t => t.welcome)) {
      addTask({
        title: 'Bem-vindo ao TaskMaster!',
        description: 'Toque no botão "+" para criar sua primeira tarefa. Você pode editar ou excluir tarefas a qualquer momento.',
        status: 'todo',
        welcome: true
      });
    }
  }, [tasks, addTask]);

  function toggleColumnSize(column) {
    setColumnSizes(prev => {
      const order = ['small', 'medium', 'large'];
      const current = prev[column];
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [column]: next };
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo, {user?.name}!</Text>
        <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
      </View>

      <View style={styles.viewModeSelector}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
          onPress={() => setViewMode('list')}
        >
          <Text style={viewMode === 'list' ? styles.activeText : styles.inactiveText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'kanban' && styles.activeViewMode]}
          onPress={() => setViewMode('kanban')}
        >
          <Text style={viewMode === 'kanban' ? styles.activeText : styles.inactiveText}>Kanban</Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskListItem task={item} kanban={false} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.kanbanContainer}>
          {/* Coluna A Fazer */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={[
              styles.kanbanColumn,
              columnSizes.todo === 'large' && styles.kanbanColumnExpanded,
              columnSizes.todo === 'medium' && styles.kanbanColumnMedium,
              columnSizes.todo === 'small' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => toggleColumnSize('todo')}
          >
            <Text style={styles.kanbanColumnTitle}>
              A Fazer {columnSizes.todo === 'large' ? '' : columnSizes.todo === 'medium' ? '' : ''}
            </Text>
            <ScrollView style={styles.kanbanList}>
              {tasks
                .filter(t => t.status === 'todo' && !t.welcome)
                .map(task => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    kanban={true}
                    size={columnSizes.todo}
                  />
                ))}
            </ScrollView>
          </TouchableOpacity>
          {/* Coluna Em Progresso */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={[
              styles.kanbanColumn,
              columnSizes.doing === 'large' && styles.kanbanColumnExpanded,
              columnSizes.doing === 'medium' && styles.kanbanColumnMedium,
              columnSizes.doing === 'small' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => toggleColumnSize('doing')}
          >
            <Text style={styles.kanbanColumnTitle}>
              Em Progresso {columnSizes.doing === 'large' ? '' : columnSizes.doing === 'medium' ? '' : ''}
            </Text>
            <ScrollView style={styles.kanbanList}>
              {tasks
                .filter(t => t.status === 'doing' && !t.welcome)
                .map(task => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    kanban={true}
                    size={columnSizes.doing}
                  />
                ))}
            </ScrollView>
          </TouchableOpacity>
          {/* Coluna Concluída */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={[
              styles.kanbanColumn,
              columnSizes.done === 'large' && styles.kanbanColumnExpanded,
              columnSizes.done === 'medium' && styles.kanbanColumnMedium,
              columnSizes.done === 'small' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => toggleColumnSize('done')}
          >
            <Text style={styles.kanbanColumnTitle}>
              Concluída {columnSizes.done === 'large' ? '' : columnSizes.done === 'medium' ? '' : ''}
            </Text>
            <ScrollView style={styles.kanbanList}>
              {tasks
                .filter(t => t.status === 'done' && !t.welcome)
                .map(task => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    kanban={true}
                    size={columnSizes.done}
                  />
                ))}
            </ScrollView>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewModeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  viewModeButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeViewMode: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
  listContent: {
    paddingBottom: 20,
  },
  kanbanContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
    minHeight: 100,
    maxHeight: '100%',
  },
  kanbanColumnExpanded: {
    flex: 3, // grande
    zIndex: 2,
  },
  kanbanColumnMedium: {
    flex: 2, // médio
    zIndex: 1,
    opacity: 0.85,
  },
  kanbanColumnCollapsed: {
    flex: 1, // pequeno
    opacity: 0.6,
    zIndex: 1,
  },
  kanbanColumnTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  kanbanList: {
    flexGrow: 1,
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});