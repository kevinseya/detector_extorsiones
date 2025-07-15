const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  transcripcionUrl: String,
  latitud: Number,
  longitud: Number,
  ubicacion: String,
  fecha: { type: Date, default: Date.now }
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
