const mongoose = require('mongoose');

const cartoonSchema = new mongoose.Schema({
  cartoonName: String,
  cartoonImage: String,
});

const Cartoon = mongoose.model('cartoonDetail', cartoonSchema);
module.exports = Cartoon;