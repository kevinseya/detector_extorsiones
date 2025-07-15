const express = require('express');
const router = express.Router();
const Audio = require('../models/Audio');
const Video = require('../models/Video');
const UnifiedEvent = require('../models/UnifiedEvent');
const { sendToWebSocket } = require('../config/websocket'); // Función para enviar al WebSocket

router.post('/', async (req, res) => {
  const { ipCamara, latitud, longitud, ubicacion, videoUrl } = req.body;

  // Guardamos el evento de video
  const eventVideo = new Video({
    ipCamara,
    latitud,
    longitud,
    ubicacion,
    videoUrl,
    fecha: new Date()  // Tomamos la fecha actual cuando recibimos el video
  });

  await eventVideo.save();

  // Buscar un evento de audio dentro de un rango de 5 segundos (antes o después)
  const matchingAudioEvent = await Audio.findOne({
    latitud,
    longitud,
    ubicacion,
    fecha: { $gte: new Date(eventVideo.fecha - 10000), $lte: new Date(eventVideo.fecha + 10000) }
  });

  if (matchingAudioEvent) {
    // Calculamos la diferencia de tiempo en milisegundos entre los dos eventos (audio y video)
    const diffTime = Math.abs(eventVideo.fecha - matchingAudioEvent.fecha);

    // Si la diferencia es mayor a 5 segundos, no unificar los eventos
    if (diffTime > 5000) {
      console.log('Eventos no unificados: la diferencia de tiempo es mayor a 5 segundos');
      return res.status(200).send({ message: "Los eventos no cumplen el requisito de tiempo de 5 segundos." });
    }

    // Si la diferencia de tiempo es menor o igual a 5 segundos, unificamos los eventos
    const unifiedEvent = new UnifiedEvent({
      evento: `NOTIFICACION DETECTADA DE AUDIO Y VIDEO DE EXTORSION EN EMPRENDIMIENTO ${matchingAudioEvent.ubicacion}`,
      ubicacion: matchingAudioEvent.ubicacion,
      latitud: matchingAudioEvent.latitud,
      longitud: matchingAudioEvent.longitud,
      ipCamara: eventVideo.ipCamara,
      videoUrl: eventVideo.videoUrl,
      transcripcionUrl: matchingAudioEvent.transcripcionUrl,
      fecha: new Date()  // Usamos la fecha actual al unificar los eventos
    });

    // Guardamos el evento unificado en la base de datos
    await unifiedEvent.save();

    // Enviar el evento unificado por WebSocket
    sendToWebSocket(unifiedEvent); // Enviar el JSON al WebSocket
    console.log('Evento unificado enviado al WebSocket');
  } else {
    console.log('No se encontró un evento de audio correspondiente en el rango de 5 segundos.');
  }

  res.status(200).send({ message: "Video procesado y validado." });
});

module.exports = router;
