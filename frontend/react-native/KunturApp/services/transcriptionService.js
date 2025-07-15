// src/services/transcriptionService.js
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';

class TranscriptionService {
  constructor() {
    this.transcriptionDirectory = FileSystem.documentDirectory + 'kuntur_transcriptions/';
    this.isTranscribing = false;
  }

  // Crear directorio si no existe
  async ensureDirectoryExists() {
    try {
      const info = await FileSystem.getInfoAsync(this.transcriptionDirectory);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(this.transcriptionDirectory, { intermediates: true });
      }
    } catch (error) {
      console.error('Error al crear directorio:', error);
    }
  }

  // Simulación de transcripción (ya que no podemos usar servicios externos)
  async transcribeAudio(audioUri, fileName) {
    try {
      await this.ensureDirectoryExists();
      this.isTranscribing = true;

      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulación de transcripción - en una implementación real aquí irían los servicios de transcripción
      const mockTranscription = this.generateMockTranscription(fileName);
      
      // Guardar transcripción como archivo de texto
      const transcriptionFileName = fileName.replace('.m4a', '.txt');
      const transcriptionUri = this.transcriptionDirectory + transcriptionFileName;
      
      const transcriptionData = {
        fileName: transcriptionFileName,
        originalAudioFile: fileName,
        transcriptionText: mockTranscription,
        timestamp: new Date().toISOString(),
        audioUri: audioUri,
        transcriptionUri: transcriptionUri
      };

      // Guardar el archivo de texto
      await FileSystem.writeAsStringAsync(transcriptionUri, mockTranscription);

      // Guardar metadatos como JSON
      const metadataUri = this.transcriptionDirectory + transcriptionFileName.replace('.txt', '_metadata.json');
      await FileSystem.writeAsStringAsync(metadataUri, JSON.stringify(transcriptionData, null, 2));

      this.isTranscribing = false;
      return transcriptionData;

    } catch (error) {
      console.error('Error al transcribir audio:', error);
      this.isTranscribing = false;
      throw error;
    }
  }

  // Mock de transcripción (reemplazar por servicio real)
  generateMockTranscription(fileName) {
    const mockTexts = [
      "Alerta de seguridad detectada en el área principal. Revisión requerida.",
      "Sonido anormal detectado en el sistema. Verificar funcionamiento.",
      "Actividad registrada a las " + new Date().toLocaleTimeString(),
      "Audio procesado correctamente. Sistema operativo normal.",
      "Detección de voz humana en el área de monitoreo."
    ];
    
    return mockTexts[Math.floor(Math.random() * mockTexts.length)];
  }

  // Obtener todas las transcripciones
  async getTranscriptions() {
    try {
      await this.ensureDirectoryExists();
      const files = await FileSystem.readDirectoryAsync(this.transcriptionDirectory);
      
      const transcriptions = [];
      for (const file of files) {
        if (file.endsWith('_metadata.json')) {
          const metadataUri = this.transcriptionDirectory + file;
          const content = await FileSystem.readAsStringAsync(metadataUri);
          transcriptions.push(JSON.parse(content));
        }
      }
      
      // Ordenar por timestamp (más reciente primero)
      return transcriptions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Error al obtener transcripciones:', error);
      return [];
    }
  }

  // Obtener transcripción específica
  async getTranscription(fileName) {
    try {
      const transcriptionUri = this.transcriptionDirectory + fileName;
      const content = await FileSystem.readAsStringAsync(transcriptionUri);
      return content;
    } catch (error) {
      console.error('Error al obtener transcripción:', error);
      return null;
    }
  }

  // Eliminar transcripción
  async deleteTranscription(fileName) {
    try {
      const transcriptionUri = this.transcriptionDirectory + fileName;
      const metadataUri = this.transcriptionDirectory + fileName.replace('.txt', '_metadata.json');
      
      await FileSystem.deleteAsync(transcriptionUri);
      await FileSystem.deleteAsync(metadataUri);
      
      return true;
    } catch (error) {
      console.error('Error al eliminar transcripción:', error);
      return false;
    }
  }

  // Obtener estadísticas
  async getStats() {
    try {
      const transcriptions = await this.getTranscriptions();
      return {
        totalTranscriptions: transcriptions.length,
        latestTranscription: transcriptions[0] || null,
        oldestTranscription: transcriptions[transcriptions.length - 1] || null
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return null;
    }
  }

  // Exportar todas las transcripciones a un archivo
  async exportTranscriptions() {
    try {
      const transcriptions = await this.getTranscriptions();
      const exportData = {
        exportDate: new Date().toISOString(),
        totalTranscriptions: transcriptions.length,
        transcriptions: transcriptions
      };
      
      const exportFileName = `transcriptions_export_${new Date().toISOString().split('T')[0]}.json`;
      const exportUri = this.transcriptionDirectory + exportFileName;
      
      await FileSystem.writeAsStringAsync(exportUri, JSON.stringify(exportData, null, 2));
      
      return {
        success: true,
        exportUri,
        fileName: exportFileName
      };
    } catch (error) {
      console.error('Error al exportar transcripciones:', error);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      isTranscribing: this.isTranscribing,
      transcriptionDirectory: this.transcriptionDirectory
    };
  }
}

export default new TranscriptionService();