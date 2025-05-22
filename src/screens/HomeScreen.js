import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskListItem from '../components/TaskListItem';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { tasks, viewMode, setViewMode, addTask } = useTasks();

  const [columnSizes, setColumnSizes] = useState({
    todo: 'small',
    doing: 'small',
    done: 'small'
  });

  useEffect(() => {
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
          accessibilityLabel="Visualizar em lista"
          activeOpacity={0.7}
        >
          <Text style={viewMode === 'list' ? styles.activeText : styles.inactiveText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'kanban' && styles.activeViewMode]}
          onPress={() => setViewMode('kanban')}
          accessibilityLabel="Visualizar em kanban"
          activeOpacity={0.7}
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
            accessibilityLabel="Expandir ou reduzir coluna A Fazer"
          >
            <Text style={styles.kanbanColumnTitle}>A Fazer</Text>
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
            accessibilityLabel="Expandir ou reduzir coluna Em Progresso"
          >
            <Text style={styles.kanbanColumnTitle}>Em Progresso</Text>
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
            accessibilityLabel="Expandir ou reduzir coluna Concluída"
          >
            <Text style={styles.kanbanColumnTitle}>Concluída</Text>
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
        accessibilityLabel="Adicionar nova tarefa"
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: '#f5f5f5',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  welcome: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  viewModeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: width * 0.05,
    gap: 10,
  },
  viewModeButton: {
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.06,
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
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#000',
  },
  listContent: {
    paddingBottom: width * 0.1,
  },
  kanbanContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: width * 0.04,
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: width * 0.02,
    marginHorizontal: 4,
    minHeight: 100,
    maxHeight: '100%',
  },
  kanbanColumnExpanded: {
    flex: 3,
    zIndex: 2,
  },
  kanbanColumnMedium: {
    flex: 2,
    zIndex: 1,
    opacity: 0.85,
  },
  kanbanColumnCollapsed: {
    flex: 1,
    opacity: 0.6,
    zIndex: 1,
  },
  kanbanColumnTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
      android: {},
    }),
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});