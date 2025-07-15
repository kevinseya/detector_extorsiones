// src/screens/Historial/Historial.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../assets/colors';
import Footer from '../../components/Footer';
import styles from './styles'; // Importamos los estilos

// Directorio de grabaciones
const recordingsDir = FileSystem.documentDirectory + 'recordings/';

export default function Historial() {
  const [files, setFiles] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      const info = await FileSystem.getInfoAsync(recordingsDir);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(recordingsDir, { intermediates: true });
      }
      const names = await FileSystem.readDirectoryAsync(recordingsDir);
      setFiles(names);
    };
    loadFiles();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const play = async (uri) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  const remove = async (name) => {
    await FileSystem.deleteAsync(recordingsDir + name);
    setFiles((prev) => prev.filter((f) => f !== name));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => play(recordingsDir + item)}
      >
        <Text style={styles.itemText}>{item.replace('.caf', '')}</Text>
      </TouchableOpacity>
      <Button title="Borrar" onPress={() => remove(item)} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.secondary500, Colors.primary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Historial</Text>
          <FlatList
            data={files}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.empty}>No hay grabaciones aún.</Text>
            }
          />
        </View>
      </LinearGradient>

      <Footer />
    </SafeAreaView>
  );
}

