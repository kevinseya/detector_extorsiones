import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../assets/colors';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './styles'; // Importamos los estilos
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BellAlertIcon, ChartBarIcon, ShieldCheckIcon, ExclamationCircleIcon, PowerIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { startContinuousRecording, stopContinuousRecording } from '../../services/recordingUtil';
import * as FileSystem from 'expo-file-system';

// Directorio de grabaciones
const recordingsDir = FileSystem.documentDirectory + 'recordings/';

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  // Alterna grabación continua
  const toggleStatus = () => {
    if (!isActive) {
      startContinuousRecording(5000);
    } else {
      stopContinuousRecording();
    }
    setIsActive(!isActive);
  };

  // Manejador de alerta: comprueba conexión, graba 10s y envía JSON
  const handleAlertAndSend = async () => {
    try {
      // 1️⃣ Verificar conexión en AsyncStorage
      const endpoint = await AsyncStorage.getItem('endpoint');
      if (!endpoint) {
        Alert.alert('Atención', 'Primero debe hacerse una conexión en Encontrar');
        return;
      }else 
        Alert.alert('Conectado a:', endpoint);
      // Mostrar alerta de conexión
      Alert.alert('Conexión', `Conectado a ${endpoint}`);

      // 2️⃣ Iniciar grabación de 10 segundos
      startContinuousRecording(10000);
      Alert.alert('Grabación', 'Grabando...');

      // 3️⃣ Tras 10 s, detener, leer archivo y enviar JSON
      setTimeout(async () => {
        stopContinuousRecording();

        // Leer archivos y obtener el último
        const files = await FileSystem.readDirectoryAsync(recordingsDir);
        if (files.length === 0) {
          Alert.alert('Error', 'No se encontró ninguna grabación');
          return;
        }
        const lastFile = files.sort().pop();
        const uri = recordingsDir + lastFile;

        // Leer como base64
        const base64Audio = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

        // Enviar POST con JSON
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ flag: isActive, audio: base64Audio }),
        });

        if (response.ok) {
          console.log('Grabación enviada con éxito');
          Alert.alert('Éxito', 'Grabación y estado enviados correctamente');
        } else {
          console.error('Error al enviar:', response.status);
          Alert.alert('Error', `Error al enviar grabación: ${response.status}`);
        }
      }, 10000);

    } catch (error) {
      console.error('Error en alerta y envío:', error);
      Alert.alert('Error', 'Ocurrió un problema durante el proceso');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={[Colors.secondary500, Colors.primary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <Header />

        {/* Ubicación */}
        <View style={styles.locationContainer}>
          <MapPinIcon size={wp(10)} color="white" />
          <Text style={styles.locationText}>Av. Principal 123, Centro</Text>
        </View>

        <View style={styles.container_sup}>
          <View style={styles.roundedBox}>
            <View style={[styles.circleContainer, isActive ? styles.activeCircle : styles.inactiveCircle]}> 
              {isActive
                ? <ShieldCheckIcon size={wp(25)} color="white" />
                : <ExclamationCircleIcon size={wp(25)} color="white" />
              }
            </View>
            <Text style={[styles.boxTitle, isActive ? styles.boxTitle_active : styles.boxTitle_inactive]}>Kuntur</Text>
            <Text style={[styles.boxSubTitle, isActive ? styles.subTitleText_active : styles.subTitleText_inactive]}> 
              {isActive ? 'a la Escucha' : 'Apagado'}
            </Text>

            <TouchableOpacity
              style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
              onPress={toggleStatus}
            >
              <PowerIcon color={isActive ? Colors.success900 : Colors.danger900} size={wp(6)} />
              <Text style={[styles.buttonText, isActive ? styles.activeButtonText : styles.inactiveButtonText]}> 
                {isActive ? '  Apagar Kuntur' : '  Activar Kuntur'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container_inf}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.square}
              onPress={handleAlertAndSend}
            >
              <BellAlertIcon size={wp(15)} color="white" />
              <Text style={styles.squareText}>Alertar!</Text>
              <Text style={styles.squareSubText}>Enviar datos</Text>
            </TouchableOpacity>

            <View style={styles.square}>
              <ChartBarIcon size={wp(15)} color="white" />
              <Text style={styles.squareText}>Tipos de Incidencias</Text>
              <Text style={styles.squareSubText}>20</Text>
            </View>
          </View>
        </View>

      </LinearGradient>
      <Footer />
    </View>
  );
}
