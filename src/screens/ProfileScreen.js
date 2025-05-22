import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const { user, updateUser, deleteUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  function handleSave() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
      return;
    }
    updateUser({ ...user, name, email });
    setEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado!');
  }

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
        <Feather name="user" size={48} color="#6200ee" style={{ alignSelf: 'center', marginBottom: 10 }} />
        <Text style={styles.title}>Meu Perfil</Text>
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Feather name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'stretch',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', alignSelf: 'center', marginBottom: 18 },
  label: { fontWeight: 'bold', color: '#6200ee', marginTop: 8, marginBottom: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  info: { fontSize: 16, color: '#222', marginLeft: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    color: '#222',
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
    marginLeft: 6,
  },
  backButton: {
    marginTop: 28,
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
    fontSize: 17,
    marginLeft: 10,
  },
});