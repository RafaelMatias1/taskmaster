import React, { useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTasks } from '../contexts/TaskContext';

export default function TaskFormScreen({ route, navigation }) {
  const { addTask, updateTask } = useTasks();
  const task = route.params?.task;

  const { control, handleSubmit, reset } = useForm({
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
    <View style={{ padding: 16 }}>
      <Text>Título</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput style={{ borderWidth: 1, padding: 8, marginVertical: 8 }} onChangeText={onChange} value={value} />
        )}
      />
      <Text>Descrição</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput style={{ borderWidth: 1, padding: 8, marginVertical: 8 }} onChangeText={onChange} value={value} />
        )}
      />
      <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}