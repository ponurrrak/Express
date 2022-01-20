const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');
const fs = require('fs');

const isLogged = () => false;

const publicDirPath = path.join(__dirname, 'public');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(publicDirPath));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if(req.method === 'POST' && contentType.startsWith('multipart/form-data')){
    const form = formidable({
      multiples: true,
      uploadDir: path.join(publicDirPath, 'upload'),
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      req.body = fields;
      req.files = files;
      next();
    });
  } else {
    next();
  }
});

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

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message } = req.body;
  const { image } = req.files;
  if(author && sender && title && message && image.originalFilename) {
    res.render('contact', {
      isSent: true,
      filename: image.originalFilename,
      savedFilename: image.newFilename,
    });
  } else {
    res.render('contact', {isError: true})
  }
});

app.use((req, res) => {
  res.status(404).render('notFound');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
