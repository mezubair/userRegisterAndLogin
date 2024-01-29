const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/RegisterLogin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const handleLogin = require('./routes/login');
const handleRegister = require('./routes/register');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/', handleRegister);
app.post('/login', handleLogin);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
