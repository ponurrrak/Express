const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const isLogged = () => false;

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', (req, res, next) => {
  isLogged() ? next() : res.render('login');
});

app.get(/^\/(home)?$/, (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/user/settings', (req, res) => {
  res.render('settings');
});

app.get('/user/panel', (req, res) => {
  res.render('panel');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name});
});

app.use((req, res) => {
  res.status(404).render('notFound');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
