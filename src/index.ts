import express, { type Request, type Response } from "express"; // Importa o Express
import cors from "cors"; // Importa o Cors para permitir requisições
import itemRoutes from './routes/itemRoutes.js'

const app = express();

/*
type Item = {
  id:number;
  name: string;
  quantity: number;
}

let itens: Item[] = [
    { id: 1, name: "Arroz", quantity: 3 },
    { id: 2, name: "Feijão", quantity: 1 },
    { id: 3, name: "Leite", quantity: 2 },
];

const getNextId = (): number => {
  return itens.length > 0 ? Math.max(...itens.map(item => item.id)) + 1 : 1;
}

/*
const lista = {
  itens: [
    { id: 1, nome: "Arroz", quantidade: 3 },
    { id: 2, nome: "Feijão", quantidade: 1 },
    { id: 3, nome: "Leite", quantidade: 2 },
  ],
};
*/

app.use(express.json());
app.use(cors());
/*
app.get("/itens", function (req: Request, res: Response) {
  return res.json(itens);
});

app.get("/itens/:id", (req: Request<{ id: string }>, res: Response<Item | { error: string }>) => {
  const id = parseInt(req.params.id);
  const item = itens.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item não encontrado"});
  }

  return res.json(item);
});

app.post("/itens", (req: Request<{}, {}, Omit<Item, 'id'>>, res: Response<Item | { error: string}>) => {
  const { name, quantity } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Campo name obrigatório'});
  }

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({error: 'Quantidade deve ser um número positivo'});
  }

  const newItem: Item = {
    id: getNextId(),
    name: name.trim(),
    quantity
  };

  itens.push(newItem);
  return res.status(201).json(newItem);
});

app.put("/itens/:id", (req: Request<{ id: string }, {}, Partial<Omit<Item, 'id'>>>, res: Response<Item | { error: string }>) => {
  const id = parseInt(req.params.id);
  const { name, quantity } = req.body;

  const index = itens.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  if (name !== undefined && name.trim() === '') {
    return res.status(400).json({ error: "Nome não pode ser vazio" });
  }
  
  if (quantity !== undefined && quantity < 0) {
    return res.status(400).json({ error: "Quantidade deve ser um número positivo" });
  }

  itens[index] = {
    ...itens[index],
    name: name !== undefined ? name.trim() : itens[index].name,
    quantity: quantity !== undefined ? quantity : itens[index]?.quantity
  };

  return res.json(itens[index]);

});

app.delete("/itens/:id", (req: Request<{ id: string }>, res: Response<{ success: boolean } | { error: string }>) => {
  const id = parseInt(req.params.id);
  const iniLength = itens.length;

  itens = itens.filter(item => item.id !== id);

  if (itens.length === iniLength) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  return res.json({ success: true });

});
*/

app.use("/itens", itemRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Erro:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = 5000;
app.listen(5000, () => console.log(`Servidor iniciado na porta ${PORT}`));
