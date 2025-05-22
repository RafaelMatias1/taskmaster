import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import { TaskProvider } from './src/contexts/TaskContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
}

// ESTE COMPONENTE FOI MOVIDO PARA DENTRO DE App.js
function Routes() {
  const { user } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="AddTask" 
            component={TaskFormScreen} 
            options={{ 
              title: 'Nova Tarefa',
              headerShown: true,
            }} 
          />
          <Stack.Screen 
            name="EditTask" 
            component={TaskFormScreen} 
            options={{ 
              title: 'Editar Tarefa',
              headerShown: true,
            }} 
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
