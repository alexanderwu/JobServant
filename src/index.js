const app = require('./app');

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.render('layout', { content: 'index' });
});

app.get('/about', (req, res) => {
  res.render('layout', { content: 'about' });
});

app.get('*', (req, res) => {
  res.render('layout', { content: '404' });
});

app.listen(port, () => {
  console.log('Server is up on http://localhost:3000');
});
