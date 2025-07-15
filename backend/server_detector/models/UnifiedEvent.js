const mongoose = require('mongoose');

const unifiedEventSchema = new mongoose.Schema({
  evento: String,
  ubicacion: String,
  latitud: Number,
  longitud: Number,
  ipCamara: String,
  videoUrl: String,
  transcripcionUrl: String,
  fecha: { type: Date, default: Date.now }
});

const UnifiedEvent = mongoose.model('UnifiedEvent', unifiedEventSchema);

module.exports = UnifiedEvent;
