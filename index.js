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
  'Essa é a segunda mensagem'
];

app.get('/mensagens',  (req, res) => {
  res.send(mensagens.filter(Boolean));
});

app.post('/mensagens', (req, res) => {
  console.log(req.body);
  const texto = req.body.texto;
  
  mensagens.push(texto);

  res.send('Mensagem foi criada com sucesso');

});

//UPDATE - Editar uma mensagem

app.put('/mensagens/:id', (req, res) => {
  const id = +req.params.id - 1;

  const novoTexto = req.body.texto;

  mensagens[id] = novoTexto;

  res.send('Mensagem editada com sucesso')
});

app.delete('/mensagens/:id', (req, res) => {

  const id = +req.params.id -1; ///transforma string em numero para somar com 1 depois

  delete mensagens[id];
  
  res.send('Mensagem excluida com sucesso!');

});
 
app.listen(3000, () => {
  console.info('App rodando em  http://localhost:3000.');
}) ;