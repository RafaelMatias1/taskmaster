import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskListItem from '../components/TaskListItem';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { tasks, viewMode, setViewMode } = useTasks();

  // Estado para saber qual coluna está expandida
  const [expandedColumn, setExpandedColumn] = useState(null); // 'todo', 'doing', 'done' ou null

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo, {user?.name}!</Text>
        <Button title="Sair" onPress={logout} />
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
              expandedColumn === 'todo' && styles.kanbanColumnExpanded,
              expandedColumn && expandedColumn !== 'todo' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => setExpandedColumn(expandedColumn === 'todo' ? null : 'todo')}
          >
            <Text style={styles.kanbanColumnTitle}>
              A Fazer {expandedColumn === 'todo' ? '⬅️' : ''}
            </Text>
            {(expandedColumn === null || expandedColumn === 'todo') && (
              <ScrollView style={styles.kanbanList}>
                {tasks.filter(t => t.status === 'todo').map(task => (
                  <TaskListItem key={task.id} task={task} kanban={true} />
                ))}
              </ScrollView>
            )}
          </TouchableOpacity>
          {/* Coluna Em Progresso */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={[
              styles.kanbanColumn,
              expandedColumn === 'doing' && styles.kanbanColumnExpanded,
              expandedColumn && expandedColumn !== 'doing' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => setExpandedColumn(expandedColumn === 'doing' ? null : 'doing')}
          >
            <Text style={styles.kanbanColumnTitle}>
              Em Progresso {expandedColumn === 'doing' ? '⬅️' : ''}
            </Text>
            {(expandedColumn === null || expandedColumn === 'doing') && (
              <ScrollView style={styles.kanbanList}>
                {tasks.filter(t => t.status === 'doing').map(task => (
                  <TaskListItem key={task.id} task={task} kanban={true} />
                ))}
              </ScrollView>
            )}
          </TouchableOpacity>
          {/* Coluna Concluída */}
          <TouchableOpacity
            activeOpacity={0.95}
            style={[
              styles.kanbanColumn,
              expandedColumn === 'done' && styles.kanbanColumnExpanded,
              expandedColumn && expandedColumn !== 'done' && styles.kanbanColumnCollapsed
            ]}
            onPress={() => setExpandedColumn(expandedColumn === 'done' ? null : 'done')}
          >
            <Text style={styles.kanbanColumnTitle}>
              Concluída {expandedColumn === 'done' ? '⬅️' : ''}
            </Text>
            {(expandedColumn === null || expandedColumn === 'done') && (
              <ScrollView style={styles.kanbanList}>
                {tasks.filter(t => t.status === 'done').map(task => (
                  <TaskListItem key={task.id} task={task} kanban={true} />
                ))}
              </ScrollView>
            )}
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
    flex: 3, // 60% aproximadamente
    zIndex: 2,
  },
  kanbanColumnCollapsed: {
    flex: 1,
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