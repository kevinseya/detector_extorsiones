import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera }      from 'expo-camera';
import { Video }       from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors }        from '../../assets/colors';
import styles            from './styles';  // tu styles.js
import Footer            from '../../components/Footer';

const VIDEOS_DIR = FileSystem.documentDirectory + 'videos/';

export default function Camara() {
  // Validar que los componentes Camera y Video estén importados correctamente
  if (typeof Camera !== 'function') {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Error al cargar la cámara. Verifica el import de "expo-camera".</Text>
        <Footer />
      </SafeAreaView>
    );
  }
  if (typeof Video !== 'function') {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Error al cargar el reproductor de video. Verifica el import de "expo-av".</Text>
        <Footer />
      </SafeAreaView>
    );
  }
  const camRef = useRef(null);
  const [hasPerms, setHasPerms] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status: cam } = await Camera.requestCameraPermissionsAsync();
      const { status: mic } = await Camera.requestMicrophonePermissionsAsync();
      setHasPerms(cam === 'granted' && mic === 'granted');
      // Crear carpeta y cargar existentes
      const info = await FileSystem.getInfoAsync(VIDEOS_DIR);
      if (!info.exists) await FileSystem.makeDirectoryAsync(VIDEOS_DIR, { intermediates: true });
      const files = await FileSystem.readDirectoryAsync(VIDEOS_DIR);
      setVideos(files.map(n => VIDEOS_DIR + n).reverse());
    })();
  }, []);

  const grabar10s = async () => {
    if (!camRef.current || recording) return;
    setRecording(true);
    // Auto-stop en 10 s
    const stopTimer = setTimeout(() => camRef.current.stopRecording(), 10000);
    const { uri } = await camRef.current.recordAsync();
    clearTimeout(stopTimer);
    setRecording(false);
    const name = `video_${Date.now()}.mp4`;
    await FileSystem.moveAsync({ from: uri, to: VIDEOS_DIR + name });
    setVideos(v => [VIDEOS_DIR + name, ...v]);
  };

  if (hasPerms === null) return <View />;
  if (!hasPerms) return <SafeAreaView style={styles.center}><Text style={styles.error}>Permiso denegado</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.secondary500, Colors.primary500]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.cameraContainer}>
          <Camera ref={camRef} style={styles.camera} ratio="16:9" />
          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recording]}
            onPress={grabar10s}
            disabled={recording}
          >
            <Text style={styles.recordText}>{ recording ? 'Grabando…' : 'Grabar 10 s' }</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.title}>Videos grabados</Text>
          {videos.map(v => (
            <Video
              key={v}
              source={{ uri: v }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
            />
          ))}
        </View>
      </LinearGradient>
      <Footer />
    </SafeAreaView>
  );
}
