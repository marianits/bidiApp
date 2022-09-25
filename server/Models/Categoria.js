const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true  
  }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
