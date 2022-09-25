const mongoose = require('mongoose');

const AutorSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  biografia: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Autor', AutorSchema);
