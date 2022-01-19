const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  res.forceLogin = () => {
    res.show('login.html');
  };
  next();
});

app.get(/^\/(home)?$/, (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/user/settings', (req, res) => {
  res.forceLogin();
});

app.get('/user/panel', (req, res) => {
  res.forceLogin();
});

app.use((req, res) => {
  res.status(404).show('notFound.html');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
