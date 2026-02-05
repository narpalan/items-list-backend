import express, { type Request, type Response } from "express"; // Importa o Express
import cors from "cors"; // Importa o Cors para permitir requisições
import { initDatabase } from "./database/db.js";
import itemRoutes from './routes/itemRoutes.js'

initDatabase();

const app = express();

app.use(express.json());
app.use(cors());

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
