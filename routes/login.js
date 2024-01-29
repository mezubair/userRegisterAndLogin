const mongoose = require('mongoose');
const { userSchema } = require('../models/User');

const User = mongoose.model('User', userSchema);

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Error during login');
  }
};
module.exports = handleLogin;
