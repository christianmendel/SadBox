const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Musica = mongoose.model('Muscia', MusicaSchema);
module.exports = Musica;






