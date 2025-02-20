import express, { Application, Request, Response, NextFunction } from 'express';

// Inicializando o app do Express
const app: Application = express();
const PORT: number = 3000;

// Middleware para entender o corpo da requisição como JSON
app.use(express.json());

// Middleware para logar a hora exata da requisição
const logger = (req: Request, res: Response, next: NextFunction) => {
  const data = new Date();
  console.log(`Requisição feita em: ${data}`);
  next(); 
};

// Usando o middleware para todas as requisições
app.use(logger);

// 🔹 Rota GET (Buscar dados)
app.get('/usuarios', (req: Request, res: Response) => {
  res.status(200).json({ mensagem: 'Lista de usuários' });
});

// 🔹 Rota POST (Criar novo usuário)
app.post('/usuarios', (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
  } else {
    res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
  }
});

// 🔹 Rota GET /sobre (Informações do usuário)
app.get('/sobre', (req: Request, res: Response) => {
  res.status(200).json({
    nome: "João Vitor",
    idade: 30,
    descricao: "Torcedor Fanático pelo Grêmio"
  });
});

app.post('/comentarios',(req:Request,res:Response)=>{
  const { Texto } = req.body;
  if (!Texto) {
    res.status(400).json({ mensagem: 'Texto obrigatorio!' });
  } else {
    res.status(201).json({ mensagem: `Comentario ${Texto} criado com sucesso!` });
  }
});

app.delete('/comentarios/:id',(req:Request,res:Response)=>{
  const id:number = Number(req.params.id);
   if(!id){
    res.status(400).json({ mensagem: 'Id obrigatorio!' });
   }else{
    res.status(204).json({ mensagem: `Comentario ${id} criado com sucesso!` });

   }
})





// Inicia o servidor na porta configurada
app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
