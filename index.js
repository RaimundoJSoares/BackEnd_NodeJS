const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

(async () => {

const connectionString = 'mongodb://localhost:27017/';

console.info('Conectando ao banco de dados...');

const client = await mongodb.MongoClient.connect(connectionString, {
  useUnifiedTopology : true
});

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const db = client.db('Bancodedados');
 
const mensagens = db.collection('mensagens');
 
//CREATE -  cria uma mensagem
app.post('/mensagens', async (req, res) => {
  const mensagem = req.body; 
  
  await mensagens.insertOne(mensagem);

  res.send(mensagem);

}); 

//READ all -  Ler todas as mensagens
app.get('/mensagens', async (req, res) => {
  res.send(await mensagens.find().toArray());
});

//READ single - ler apenas 1 mensagem
app.get('/mensagens/:id',async(req, res) => {
  const id = req.params.id;

  res.send(await mensagens.findOne({_id:mongodb.ObjectId(id) }));

});

//UPDATE - Editar uma mensagem

app.put('/mensagens/:id', (req, res) => {
  const id = req.params.id;

  const novoTexto = req.body.texto;

 mensagens.updateOne(
   { _id: mongodb.ObjectId(id)},
   {$set: {texto: novoTexto}}
 )

  res.send(mensagens[id]);
});

app.delete('/mensagens/:id', async (req, res) => {

  const id = req.params.id; ///transforma string em numero para somar com 1 depois

  await mensagens.deleteOne({_id: mongodb.ObjectId(id) });
  
  res.send('Mensagem excluida com sucesso!');

});
 
app.listen(3000, () => {
  console.info('App rodando em  http://localhost:3000.');
}) ;
})();