import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

// Pega a largura da tela para responsividade
const { width } = Dimensions.get('window');

// Esquema de validação dos campos usando Yup
const schema = yup.object().shape({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'Mínimo 6 caracteres'),
});

// Tela de registro do app
export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  // Hook do react-hook-form para controle dos campos e validação
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Função chamada ao enviar o formulário
  const onSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password);
      navigation.replace('Home'); // Redireciona para a Home após registrar
    } catch (error) {
      // Erro tratado no contexto de autenticação
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Título e subtítulo */}
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os campos para se registrar</Text>

          {/* Campo de nome */}
          <Text style={styles.label}>Nome</Text>
          <Controller control={control} name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite seu nome"
                accessibilityLabel="Campo de nome"
                returnKeyType="next"
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

          {/* Campo de e-mail */}
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
                accessibilityLabel="Campo de e-mail"
                returnKeyType="next"
                textContentType="emailAddress"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          {/* Campo de senha */}
          <Text style={styles.label}>Senha</Text>
          <Controller control={control} name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                placeholder="Digite sua senha"
                accessibilityLabel="Campo de senha"
                returnKeyType="done"
                textContentType="password"
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          {/* Botão de registro */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            accessibilityLabel="Registrar"
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          {/* Link para tela de login */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            accessibilityLabel="Ir para tela de login"
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Já tem conta? <Text style={styles.loginLink}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos da tela de registro
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
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#6200ee',
    alignSelf: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#888',
    alignSelf: 'center',
    marginBottom: 32,
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
  loginButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
    fontSize: width * 0.038,
  },
  loginLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});