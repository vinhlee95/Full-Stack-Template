const mongoose = require('mongoose');

const ItemModel = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String, required: true
   },
   price: {
      type: Number
   },
   url: {
      type: String, required: false
   },
   date: {
      type: Date, default: Date.now(),
   }
});

module.exports = mongoose.model('Item', ItemModel );
