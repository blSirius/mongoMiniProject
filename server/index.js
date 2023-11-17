const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//add Schema
const Cartoon = require('./Models/Cartoon');

const app = express();
const PORT = 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect('mongodb+srv://siriusblackazka:azkabann@cluster0.mou1mqu.mongodb.net/Cartoon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/addCartoon', async (req, res) => {
  try {
    const { cartoonName, cartoonImage } = req.body;

    const newCartoon = new Cartoon({
      cartoonName,
      cartoonImage,
    });

    await newCartoon.save();

    res.status(201).json({ message: 'Cartoon added successfully' });
  } catch (error) {
    console.error('Error adding cartoon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getCartoonNames', async (req, res) => {
  try {
    const cartoonNames = await Cartoon.find().select('cartoonName');
    res.status(200).json(cartoonNames);
  } catch (error) {
    console.error('Error fetching cartoon names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getCartoonDetails/:cartoonName', async (req, res) => {
  try {
      const cartoonName = req.params.cartoonName;
      const cartoonDetails = await Cartoon.findOne({ cartoonName }).select('cartoonName cartoonImage');
      res.status(200).json(cartoonDetails);
  } catch (error) {
      console.error('Error fetching cartoon details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/', (req, res) => {
  res.send(`Server is running on http://localhost:${PORT}`)
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});