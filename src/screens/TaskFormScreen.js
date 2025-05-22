import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTasks } from '../contexts/TaskContext';

const { width } = Dimensions.get('window');

export default function TaskFormScreen({ route, navigation }) {
  const { addTask, updateTask } = useTasks();
  const task = route.params?.task;

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: task ? task.title : '',
      description: task ? task.description : '',
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
      });
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    if (task) {
      updateTask({ ...task, ...data });
    } else {
      addTask({ id: Date.now().toString(), status: 'todo', ...data });
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>

          <Text style={styles.label}>Título</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: 'Informe o título' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite o título"
                accessibilityLabel="Campo de título"
                returnKeyType="next"
              />
            )}
          />
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

          <Text style={styles.label}>Descrição</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: 'Informe a descrição' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.description && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite a descrição"
                accessibilityLabel="Campo de descrição"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            accessibilityLabel="Salvar tarefa"
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Cancelar"
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: width * 0.06,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#6200ee',
    alignSelf: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: width * 0.038,
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: 4,
    fontSize: width * 0.042,
  },
  inputError: {
    borderColor: '#e53935',
  },
  error: {
    color: '#e53935',
    fontSize: width * 0.032,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: width * 0.045,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 10,
  },
  cancelButtonText: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});