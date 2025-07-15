const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  ipCamara: String,
  latitud: Number,
  longitud: Number,
  ubicacion: String,
  videoUrl: String,
  fecha: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
