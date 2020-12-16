const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

(async () =>{

const connectionString = 'mongodb://localhost:27017/';

console.info('Conectando ao banco de dados...');

const client = await mongodb.MongoClient.connect(connectionString, {
  useUnifiedTopology : true
});

console.log(client);

const app = express();

app.use(bodyParser.json())

const port = 3000;
 
app.get('/', (req, res) => {
  res.send('Hello World');
});

const db = client.db('banco_de_dados');
 
const mensagens = db.collection('mensagens');
 

//CREATE -  cria uma mensagem
app.post('/mensagens', (req, res) => {
  const mensagem = req.body; 

  const id = mensagens.length +1;

  mensagem.id = id;
  
  mensagens.push(mensagem);

  res.send(mensagem);

}); 

//READ all -  Ler todas as mensagens
app.get('/mensagens',  (req, res) => {
  res.send(mensagens.filter(Boolean));
});

//READ single - ler apenas 1 mensagem
app.get('/mensagens/:id',(req, res) => {
  const id = +req.params.id -1;

  const mensagem = mensagens[id];
   
  res.send(mensagem);
});

//UPDATE - Editar uma mensagem

app.put('/mensagens/:id', (req, res) => {
  const id = +req.params.id - 1;

  const novoTexto = req.body.texto;

  mensagens[id].texto = novoTexto;

  res.send(mensagens[id]);
});

app.delete('/mensagens/:id', (req, res) => {

  const id = +req.params.id -1; ///transforma string em numero para somar com 1 depois

  delete mensagens[id];
  
  res.send('Mensagem excluida com sucesso!');

});
 
app.listen(3000, () => {
  console.info('App rodando em  http://localhost:3000.');
}) ;
})();