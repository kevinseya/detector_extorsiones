const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Conexión a MongoDB usando el URI definido en el archivo .env
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si la conexión es exitosa, se imprime un mensaje
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    // Si ocurre algún error en la conexión, se muestra el error y se termina el proceso
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Detener el servidor si no se puede conectar
  }
};

// Exportar la función de conexión a MongoDB
module.exports = connectDB;
