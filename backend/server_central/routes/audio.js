const express = require('express');
const router = express.Router();
const Audio = require('../models/Audio');

router.post('/', async (req, res) => {
  const { transcripcionUrl, latitud, longitud, ubicacion } = req.body;

  const eventAudio = new Audio({
    transcripcionUrl,
    latitud,
    longitud,
    ubicacion,
    fecha: new Date()
  });

  await eventAudio.save();

  res.status(200).send({ message: "Audio recibido y procesado." });
});

module.exports = router;
