import type { Request, Response } from 'express';
import type { Item, CreateItemDTO, UpdateItemDTO } from '../types/item.js';

let itens: Item[] = [    
    { id: 1, name: "Arroz", quantity: 3 },
    { id: 2, name: "Feijão", quantity: 1 },
    { id: 3, name: "Leite", quantity: 2 },
];

const getNextId = (): number => {
  return itens.length > 0 ? Math.max(...itens.map(item => item.id)) + 1 : 1;
};

const validateItem = (item: CreateItemDTO): string | null => {
  if (!item.name || item.name.trim() === '') {
    return "Nome é obrigatório";
  }
  
  if (item.quantity === undefined || item.quantity < 0) {
    return "Quantidade deve ser um número positivo";
  }
  
  return null;
};

export const itemController = {
    async list(req: Request, res: Response<Item[]>) {
        return res.json(itens);
    },

    async search(req: Request<{ id: string }>, res: Response<Item | { error: string }>) {
        const id = parseInt(req.params.id);
        const item = itens.find(item => item.id === id);

        if (!item) {
            return res.status(404).json({ error: 'Item não encontrado'});
        }

        return res.json(item);
    },

    async create(req: Request<{}, {}, CreateItemDTO>, res: Response<Item | { error: string }>) {
        const newItem = req.body;

        const error = validateItem(newItem);
        if (error) {
            return res.status(400).json({ error });
        }

        const completeItem: Item = {
            id: getNextId(),
            name: newItem.name.trim(),
            quantity: newItem.quantity
        };

        itens.push(completeItem);
        return res.status(201).json(completeItem);
    },

    async update(req: Request<{ id: string }, {}, UpdateItemDTO>, res: Response<Item | { error: string }>) {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        const index = itens.findIndex(item => item.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        if (updateData.name !== undefined && updateData.name.trim() === '') {
            return res.status(400).json({ error: 'Nome não pode estar vazio'});
        }

        if (updateData.quantity !== undefined && updateData.quantity < 0) {
            return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
        }

        itens[index] = {
            ...itens[index],
            ...updateData,
            name: updateData.name ? updateData.name.trim() : itens[index].name,
        };
    
        return res.json(itens[index]);
    },

    async delete(req: Request<{ id: string }>, res: Response<{ success: boolean } | { error: string }>) {
        const id = parseInt(req.params.id);
        const initialLength = itens.length;

        itens = itens.filter(item => item.id !== id);

        if (itens.length === initialLength) {
            return res.status(404).json({ error: 'Item não encontrado'});
        } 

        return res.json({ success: true });
    }
};