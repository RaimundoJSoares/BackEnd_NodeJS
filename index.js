const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const port = 3000;
 
app.get('/', (req, res) => {
  res.send('Hello World');
});

const mensagens = [
  {id:1,
    texto :'Essa é a primeira mensagem'},
    {id:2,
      texto :'Essa é a segunda mensagem'},
];

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