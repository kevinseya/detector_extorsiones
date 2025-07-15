const express = require('express');
const connectDB = require('./config/db');
const audioRoutes = require('./routes/audio');
const videoRoutes = require('./routes/video');
const { connectWebSocket } = require('./config/websocket'); // Asegúrate de que esta línea esté presente
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexión a MongoDB
connectDB();

// Conectar al WebSocket al iniciar el servidor
connectWebSocket(); // Esto debería ahora funcionar sin error

// Rutas
app.use('/audio', audioRoutes);
app.use('/video', videoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
