import type { Request, Response } from 'express';
import type { Item, CreateItemDTO, UpdateItemDTO } from '../types/item.js';
import { itemRepository } from '@/repositories/itemRepository.js';

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
        const itens = itemRepository.findAll();
        return res.json(itens);
    },

    async search(req: Request<{ id: string }>, res: Response<Item | { error: string }>) {
        const id = parseInt(req.params.id);
        const item = itemRepository.findOneBy(id);

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

        const createdItem = itemRepository.create({
            name: newItem.name.trim(),
            quantity: newItem.quantity
        });
        
        return res.status(201).json(createdItem);
    },

    async update(req: Request<{ id: string }, {}, UpdateItemDTO>, res: Response<Item | { error: string }>) {
        const id = parseInt(req.params.id);
        const updateData = req.body;       
       
        if (updateData.name !== undefined && updateData.name.trim() === '') {
            return res.status(400).json({ error: 'Nome não pode estar vazio'});
        }

        if (updateData.quantity !== undefined && updateData.quantity < 0) {
            return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
        }

        const updatedItem = itemRepository.update(id, {
            name: updateData.name?.trim(),
            quantity: updateData.quantity
        });

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
    
        return res.json(updatedItem);
    },

    async delete(req: Request<{ id: string }>, res: Response<{ success: boolean } | { error: string }>) {
        const id = parseInt(req.params.id);        

        const deleted = itemRepository.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }      

        return res.json({ success: true });
    }
};