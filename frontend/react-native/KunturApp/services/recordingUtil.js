import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// Directorio donde se guardarán las grabaciones
const recordingsDir = FileSystem.documentDirectory + 'recordings/';

// Variables de estado
let isRecording = false;
let currentRecording = null;
let timeoutId = null;

// Crear carpeta de grabaciones si no existe
async function initRecordingsFolder() {
  const info = await FileSystem.getInfoAsync(recordingsDir);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(recordingsDir, { intermediates: true });
  }
}

// Iniciar un segmento de grabación
async function startSegment() {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  currentRecording = recording;
}

// Detener el segmento y guardarlo en archivo
async function stopSegment() {
  if (!currentRecording) return;
  try {
    await currentRecording.stopAndUnloadAsync();
    const uri = currentRecording.getURI();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `recording_${timestamp}.caf`;
    await FileSystem.moveAsync({
      from: uri,
      to: recordingsDir + filename,
    });
  } catch (e) {
    console.error('Error al detener el segmento:', e);
  } finally {
    currentRecording = null;
  }
}

/**
 * Inicia la grabación continua en segmentos de `intervalMs` milisegundos
 * @param {number} intervalMs duración de cada segmento (por defecto 5000 ms)
 */
export async function startContinuousRecording(intervalMs = 5000) {
  await initRecordingsFolder();
  isRecording = true;

  // Función recursiva de grabación por segmentos
  async function recordLoop() {
    if (!isRecording) return;
    await startSegment();
    timeoutId = setTimeout(async () => {
      await stopSegment();
      recordLoop();
    }, intervalMs);
  }

  recordLoop();
}

/**
 * Detiene la grabación continua y el último segmento activo
 */
export async function stopContinuousRecording() {
  isRecording = false;
  if (timeoutId) clearTimeout(timeoutId);
  await stopSegment();
}
