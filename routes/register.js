const mongoose = require('mongoose');
const { userSchema } = require('../models/User');

const User = mongoose.model('User', userSchema);

const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);
  } catch (error) {
    console.error('Error saving user:', error.message);
    return res.status(500).send('Error saving user');
  }

  res.send('Data submitted to MongoDB using Mongoose');
};

module.exports = handleRegister;
