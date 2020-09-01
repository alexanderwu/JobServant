const express = require('express');
const jobRouter = require('./routers/job');
require('./db/mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(jobRouter);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.post('/input', (req, res) => {
  // console.log(req.body);
  const { url } = req.body;
  console.log(url);
  // res.render('layout', { content: 'index' });
  res.redirect('/');
});

module.exports = app;
