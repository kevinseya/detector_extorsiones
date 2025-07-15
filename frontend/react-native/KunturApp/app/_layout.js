// app/_layout.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../assets/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        // Opciones globales para todos los headers
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 }, // color de fondo
          headerTintColor: 'white',                            // color de texto y botones
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Home (index.js) sin header */}
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />

        {/* Historial (app/Historial/index.js) */}
        <Stack.Screen 
          name="Historial" 
          options={{ title: 'Historial' }} 
        />

        {/* Monitor (app/Monitor/index.js) */}
        <Stack.Screen 
          name="Monitor" 
          options={{ title: 'Monitoreo' }} 
        />

        {/* Contacts (app/Contacts/index.js) */}
        <Stack.Screen 
          name="Camara" 
          options={{ title: 'Camara' }} 
        />

        {/* Find (app/Find/index.js) */}
        <Stack.Screen 
          name="Find" 
          options={{ title: 'Encontrar' }} 
        />
      </Stack>
    </>
  );
}
