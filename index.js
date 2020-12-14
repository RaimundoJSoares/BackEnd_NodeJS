const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const port = 3000;
 
app.get('/', (req, res) => {
  res.send('Hello World');
});

const mensagens = [
  'Essa é a primeira mensagem',
  'Essa é a segnda mensagem'
];

app.get('/mensagens',  (req, res) => {
  res.send('Exibir a lista de mensagens')
});

app.post('/mensagens', (req, res) => {
  
  const texto = req.body.texto;

  mensagens.push(texto);

  res.send('Mensagem foi criada com sucesso');

});
 
app.listen(port, () => {
  console.info('App rodando em  http://localhost' + port);
}) ;