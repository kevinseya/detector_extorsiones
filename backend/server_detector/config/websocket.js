const WebSocket = require('ws'); // Importa la librería WebSocket
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Variable para la conexión WebSocket
let wsClient = null;

// Función para conectar al WebSocket
const connectWebSocket = () => {
  console.log('Intentando conectar al WebSocket...');  // Log para comprobar si estamos intentando conectar

  wsClient = new WebSocket(process.env.WEB_SOCKET_URL); // Intentamos conectarnos al WebSocket

  // Cuando la conexión se establece correctamente
  wsClient.on('open', () => {
    console.log('Conexión WebSocket establecida exitosamente.');  // Log cuando se abre la conexión
  });

  // Si se cierra la conexión WebSocket
  wsClient.on('close', () => {
    console.log('Desconectado del WebSocket.');  // Log cuando la conexión se cierra
  });

  // Si ocurre un error en la conexión WebSocket
  wsClient.on('error', (error) => {
    console.error('Error en WebSocket:', error);  // Log para cualquier error de WebSocket
  });

  // Log para verificar el estado de la conexión cada vez que cambia
  wsClient.on('ping', () => {
    console.log('Recibido ping del WebSocket.');
  });

  wsClient.on('pong', () => {
    console.log('Recibido pong del WebSocket.');
  });
};

// Función para enviar el JSON al WebSocket
const sendToWebSocket = (data) => {
  if (wsClient && wsClient.readyState === WebSocket.OPEN) {
    console.log('Enviando evento al WebSocket:', data);  // Log para ver qué evento se está enviando
    wsClient.send(JSON.stringify(data));  // Enviar el objeto JSON al WebSocket
  } else {
    console.error('WebSocket no está conectado.No se ha enviado el evento al WebSocket.');
  }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
  connectWebSocket,
  sendToWebSocket,
};
