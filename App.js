const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/', async (req, res) => {
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
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.post('/login', async (req, res) => {
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
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
