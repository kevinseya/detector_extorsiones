// src/hooks/useAudioTranscription.js
import { useState, useEffect } from 'react';
import AudioService from '../services/audioService';
import TranscriptionService from '../services/transcriptionService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAudioTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [error, setError] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [transcriptions, setTranscriptions] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);

  // Cargar datos al inicializar
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [transcriptionsList, audioFilesList] = await Promise.all([
        TranscriptionService.getTranscriptions(),
        AudioService.getAudioFiles()
      ]);
      
      setTranscriptions(transcriptionsList);
      setAudioFiles(audioFilesList);
      
      // Cargar última transcripción
      if (transcriptionsList.length > 0) {
        setTranscriptionText(transcriptionsList[0].transcriptionText);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setError('Error al cargar datos');
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      setIsRecording(true);
      setRecordingDuration(0);
      
      const recording = await AudioService.startRecording();
      
      // Actualizar duración cada segundo
      const intervalId = setInterval(() => {
        if (recording && AudioService.getRecordingStatus().isRecording) {
          recording.getStatusAsync().then(status => {
            if (status.isRecording) {
              setRecordingDuration(Math.floor(status.durationMillis / 1000));
            }
          });
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      // Guardar interval ID para limpiar después
      recording.intervalId = intervalId;
      
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      setError('Error al iniciar grabación: ' + error.message);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      
      const audioResult = await AudioService.stopRecording();
      
      // Limpiar interval
      if (AudioService.recording?.intervalId) {
        clearInterval(AudioService.recording.intervalId);
      }
      
      // Iniciar transcripción automáticamente
      await transcribeAudio(audioResult.uri, audioResult.fileName);
      
      // Recargar lista de archivos
      await loadData();
      
      return audioResult;
      
    } catch (error) {
      console.error('Error al detener grabación:', error);
      setError('Error al detener grabación: ' + error.message);
    }
  };

  const transcribeAudio = async (audioUri, fileName) => {
    try {
      setIsTranscribing(true);
      setError(null);
      
      const result = await TranscriptionService.transcribeAudio(audioUri, fileName);
      
      if (result) {
        setTranscriptionText(result.transcriptionText);
        
        // Guardar en AsyncStorage para persistencia
        await AsyncStorage.setItem('lastTranscription', JSON.stringify({
          text: result.transcriptionText,
          timestamp: result.timestamp,
          fileName: result.fileName
        }));
        
        // Recargar transcripciones
        await loadData();
        
        return result;
      } else {
        throw new Error('Error en transcripción');
      }
      
    } catch (error) {
      console.error('Error al transcribir:', error);
      setError('Error al transcribir audio: ' + error.message);
      throw error;
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const clearTranscription = () => {
    setTranscriptionText('');
    setError(null);
  };

  const deleteTranscription = async (fileName) => {
    try {
      const success = await TranscriptionService.deleteTranscription(fileName);
      if (success) {
        await loadData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar transcripción:', error);
      setError('Error al eliminar transcripción');
      return false;
    }
  };

  const deleteAudioFile = async (fileName) => {
    try {
      const success = await AudioService.deleteAudioFile(fileName);
      if (success) {
        await loadData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar archivo de audio:', error);
      setError('Error al eliminar archivo de audio');
      return false;
    }
  };

  const exportTranscriptions = async () => {
    try {
      const result = await TranscriptionService.exportTranscriptions();
      return result;
    } catch (error) {
      console.error('Error al exportar transcripciones:', error);
      setError('Error al exportar transcripciones');
      return { success: false, error: error.message };
    }
  };

  const getLastTranscription = async () => {
    try {
      const lastTranscription = await AsyncStorage.getItem('lastTranscription');
      if (lastTranscription) {
        return JSON.parse(lastTranscription);
      }
      return null;
    } catch (error) {
      console.error('Error al obtener última transcripción:', error);
      return null;
    }
  };

  const getStats = async () => {
    try {
      const stats = await TranscriptionService.getStats();
      return stats;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return null;
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  return {
    // Estados
    isRecording,
    isTranscribing,
    transcriptionText,
    error,
    recordingDuration,
    transcriptions,
    audioFiles,
    
    // Funciones de grabación
    startRecording,
    stopRecording,
    toggleRecording,
    
    // Funciones de transcripción
    transcribeAudio,
    clearTranscription,
    deleteTranscription,
    exportTranscriptions,
    
    // Funciones de archivos
    deleteAudioFile,
    
    // Funciones de datos
    getLastTranscription,
    getStats,
    refreshData,
    
    // Utilidades
    loadData
  };
};

export default useAudioTranscription;