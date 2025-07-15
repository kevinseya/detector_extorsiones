// src/services/audioService.js
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

class AudioService {
  constructor() {
    this.recording = null;
    this.isRecording = false;
    this.audioDirectory = FileSystem.documentDirectory + 'kuntur_audio/';
    this.transcriptionDirectory = FileSystem.documentDirectory + 'kuntur_transcriptions/';
  }

  // Crear directorios si no existen
  async ensureDirectoriesExist() {
    try {
      const audioInfo = await FileSystem.getInfoAsync(this.audioDirectory);
      if (!audioInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.audioDirectory, { intermediates: true });
      }

      const transcriptionInfo = await FileSystem.getInfoAsync(this.transcriptionDirectory);
      if (!transcriptionInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.transcriptionDirectory, { intermediates: true });
      }
    } catch (error) {
      console.error('Error al crear directorios:', error);
    }
  }

  async requestPermissions() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permisos de audio denegados');
      }
      return true;
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  }

  async startRecording() {
    try {
      await this.ensureDirectoriesExist();
      
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Sin permisos de audio');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      // Crear nombre único para el archivo
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `audio_${timestamp}.m4a`;
      const fileUri = this.audioDirectory + fileName;

      const { recording } = await Audio.Recording.createAsync(
        {
          android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_FORMAT_ANDROID_AAC,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_FORMAT_IOS_AAC,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        },
        undefined,
        100
      );

      this.recording = recording;
      this.isRecording = true;
      this.currentFileName = fileName;

      return recording;
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      throw error;
    }
  }

  async stopRecording() {
    try {
      if (!this.recording) {
        throw new Error('No hay grabación activa');
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      
      // Mover el archivo a nuestro directorio personalizado
      const finalUri = this.audioDirectory + this.currentFileName;
      await FileSystem.moveAsync({
        from: uri,
        to: finalUri
      });

      this.isRecording = false;
      this.recording = null;

      return {
        uri: finalUri,
        fileName: this.currentFileName,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error al detener grabación:', error);
      throw error;
    }
  }

  async pauseRecording() {
    try {
      if (this.recording) {
        await this.recording.pauseAsync();
      }
    } catch (error) {
      console.error('Error al pausar grabación:', error);
      throw error;
    }
  }

  async resumeRecording() {
    try {
      if (this.recording) {
        await this.recording.startAsync();
      }
    } catch (error) {
      console.error('Error al reanudar grabación:', error);
      throw error;
    }
  }

  // Obtener lista de archivos de audio
  async getAudioFiles() {
    try {
      await this.ensureDirectoriesExist();
      const files = await FileSystem.readDirectoryAsync(this.audioDirectory);
      return files.map(file => ({
        name: file,
        uri: this.audioDirectory + file
      }));
    } catch (error) {
      console.error('Error al obtener archivos de audio:', error);
      return [];
    }
  }

  // Eliminar archivo de audio
  async deleteAudioFile(fileName) {
    try {
      const fileUri = this.audioDirectory + fileName;
      await FileSystem.deleteAsync(fileUri);
      return true;
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      return false;
    }
  }

  getRecordingStatus() {
    return {
      isRecording: this.isRecording,
      recording: this.recording,
      audioDirectory: this.audioDirectory,
      transcriptionDirectory: this.transcriptionDirectory
    };
  }
}

export default new AudioService();