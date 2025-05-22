import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Pega a largura da tela para responsividade
const { width } = Dimensions.get('window');

// Tela de perfil do usuário
export default function ProfileScreen({ navigation }) {
  // Hooks e estados do contexto de autenticação
  const { user, updateUser, deleteUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Salva as alterações do perfil
  function handleSave() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
      return;
    }
    updateUser({ ...user, name, email });
    setEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado!');
  }

  // Confirmação e exclusão da conta
  function handleDelete() {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteUser(user.id);
            logout();
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Ícone e título */}
        <Feather name="user" size={width * 0.13} color="#6200ee" style={{ alignSelf: 'center', marginBottom: 10 }} />
        <Text style={styles.title}>Meu Perfil</Text>
        {/* Formulário de edição */}
        {editing ? (
          <>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <MaterialIcons name="save" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)}>
                <MaterialIcons name="cancel" size={20} color="#333" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Exibição dos dados do usuário */}
            <View style={styles.infoRow}>
              <Feather name="user" size={20} color="#6200ee" />
              <Text style={styles.info}>{user?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color="#6200ee" />
              <Text style={styles.info}>{user?.email}</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
                <Feather name="edit" size={20} color="#333" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Feather name="trash-2" size={20} color="#fff" />
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {/* Botão para sair da conta */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout} accessibilityLabel="Sair da conta" activeOpacity={0.7}>
        <Feather name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
      {/* Botão para voltar para a Home */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Feather name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela de perfil
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: width * 0.06 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: width * 0.07,
    width: width > 400 ? 360 : '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'stretch',
  },
  title: { fontSize: width * 0.055, fontWeight: 'bold', color: '#222', alignSelf: 'center', marginBottom: 18 },
  label: { fontWeight: 'bold', color: '#6200ee', marginTop: 8, marginBottom: 2, fontSize: width * 0.038 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  info: { fontSize: width * 0.042, color: '#222', marginLeft: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    padding: width * 0.035,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    color: '#222',
    fontSize: width * 0.042,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 14,
    marginBottom: 4,
  },
  editButton: {
    backgroundColor: '#ffd600',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 4,
  },
  editButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: width * 0.042,
    marginLeft: 6,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.042,
    marginLeft: 6,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: width * 0.042,
    marginLeft: 6,
  },
  deleteButton: {
    backgroundColor: '#e53935',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.042,
    marginLeft: 6,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#888',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginLeft: 10,
  },
  backButton: {
    marginTop: 18,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginLeft: 10,
  },
});