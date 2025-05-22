import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskListItem from '../components/TaskListItem';

// Pega a largura da tela para responsividade
const { width } = Dimensions.get('window');

// Tela principal (Home) do app
export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { tasks, viewMode, setViewMode, addTask } = useTasks();

  // Estado para controlar o tamanho das colunas do Kanban
  const [columnSizes, setColumnSizes] = useState({
    todo: 'small',
    doing: 'small',
    done: 'small'
  });

  // Adiciona uma tarefa de boas-vindas se não existir
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

  // Alterna o tamanho da coluna (small, medium, large)
  function toggleColumnSize(column) {
    setColumnSizes(prev => {
      const order = ['small', 'medium', 'large'];
      const current = prev[column];
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [column]: next };
    });
  }

  // Renderiza o título da coluna com a bolinha indicadora acima do texto
  function renderKanbanColumnTitle(title, size) {
    let indicatorStyle = styles.sizeIndicatorSmall;
    if (size === 'medium') indicatorStyle = styles.sizeIndicatorMedium;
    if (size === 'large') indicatorStyle = styles.sizeIndicatorLarge;

    return (
      <View style={styles.kanbanColumnTitleContainer}>
        <View style={[styles.sizeIndicator, indicatorStyle]} />
        <Text style={styles.kanbanColumnTitle}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com boas-vindas e botão de perfil */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo, {user?.name}!</Text>
        <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
      </View>

      {/* Seletor de modo de visualização */}
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

      {/* Renderiza lista ou kanban */}
      {viewMode === 'list' ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskListItem task={item} kanban={false} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.kanbanContainer}>
          {['todo', 'doing', 'done'].map((status, idx) => (
            <View
              key={status}
              style={[
                styles.kanbanColumn,
                styles[`kanbanColumn_${status}`],
              ]}
            >
              <View style={styles.kanbanColumnHeader}>
                <Text style={styles.kanbanColumnIcon}>
                  {status === 'todo' && '📝'}
                  {status === 'doing' && '⏳'}
                  {status === 'done' && '✅'}
                </Text>
                <Text style={styles.kanbanColumnTitle}>
                  {status === 'todo' && 'A Fazer'}
                  {status === 'doing' && 'Em Progresso'}
                  {status === 'done' && 'Concluída'}
                </Text>
              </View>
              <ScrollView style={styles.kanbanList} contentContainerStyle={{ paddingBottom: 16 }}>
                {tasks
                  .filter(t => t.status === status && !t.welcome)
                  .map(task => (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      kanban={true}
                      size="large"
                    />
                  ))}
              </ScrollView>
            </View>
          ))}
        </View>
      )}

      {/* Botão flutuante para adicionar nova tarefa */}
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

// Estilos da tela Home
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
    gap: 10,
    paddingBottom: width * 0.04,
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginHorizontal: 4,
    minHeight: 100,
    maxHeight: '100%',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  kanbanColumn_todo: {
    backgroundColor: '#e3f2fd',
  },
  kanbanColumn_doing: {
    backgroundColor: '#fffde7',
  },
  kanbanColumn_done: {
    backgroundColor: '#e8f5e9',
  },
  kanbanColumnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  kanbanColumnIcon: {
    fontSize: 22,
  },
  kanbanColumnTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    color: '#333',
  },
  kanbanList: {
    flexGrow: 1,
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
  kanbanColumnTitleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  sizeIndicator: {
    marginBottom: 6,
    borderRadius: 50,
    backgroundColor: '#888',
  },
  sizeIndicatorSmall: {
    width: 10,
    height: 10,
    backgroundColor: '#bdbdbd',
  },
  sizeIndicatorMedium: {
    width: 18,
    height: 18,
    backgroundColor: '#ffb300',
  },
  sizeIndicatorLarge: {
    width: 28,
    height: 28,
    backgroundColor: '#388e3c',
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