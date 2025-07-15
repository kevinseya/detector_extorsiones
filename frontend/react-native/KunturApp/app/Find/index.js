// app/Find/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../assets/colors';
import Footer from '../../components/Footer';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Find() {
  const [endpoint, setEndpoint] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  // Validación básica de URL (http/https)
  const validateEndpoint = (value) => {
    const regex = /^(https?:\/\/)[^\s]+$/;
    return regex.test(value);
  };

  // Intenta conectar con GET y persiste endpoint
  const connect = async () => {
    if (!validateEndpoint(endpoint)) {
      setError('URL inválida. Ejemplo: http://5.78.136.96:8000/ui/');
      setStatus('');
      return;
    }
    setError('');
    setStatus('Conectando...');
    try {
      const resp = await fetch(endpoint);
      if (resp.ok) {
        // Guardar en storage para persistencia
        await AsyncStorage.setItem('endpoint', endpoint);
        setStatus('Conexión exitosa!');
      } else {
        setStatus(`Error ${resp.status}: ${resp.statusText}`);
      }
    } catch (e) {
      console.error(e);
      setStatus('No se pudo conectar');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.secondary500, Colors.primary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Endpoint URL</Text>
          <TextInput
            style={styles.input}
            placeholder="http://5.78.136.96:8000/ui/"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={endpoint}
            onChangeText={setEndpoint}
            autoCapitalize="none"
            keyboardType="url"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={connect}>
            <Text style={styles.buttonText}>Conectar</Text>
          </TouchableOpacity>
          {status ? <Text style={styles.status}>{status}</Text> : null}
        </View>
      </LinearGradient>
      <Footer />
    </SafeAreaView>
  );
}
