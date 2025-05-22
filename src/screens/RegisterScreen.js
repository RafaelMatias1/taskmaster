import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'Mínimo 6 caracteres'),
});

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password);
    } catch (error) {
      // Tratado no contexto
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha os campos para se registrar</Text>

      <Text style={styles.label}>Nome</Text>
      <Controller control={control} name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            onChangeText={onChange}
            value={value}
            placeholder="Digite seu nome"
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <Controller control={control} name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Senha</Text>
      <Controller control={control} name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            secureTextEntry
            onChangeText={onChange}
            value={value}
            placeholder="Digite sua senha"
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Já tem conta? <Text style={styles.loginLink}>Entrar</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    alignSelf: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    alignSelf: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#e53935',
  },
  error: {
    color: '#e53935',
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
    fontSize: 14,
  },
  loginLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});