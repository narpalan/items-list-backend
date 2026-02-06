import db from '../database/db.js';
import type { Item, CreateItemDTO, UpdateItemDTO } from '../types/item.js';

export const itemRepository = {

    findAll(): Item[] {
        const rows = db.prepare('SELECT * FROM itens ORDER BY id').all();
        return rows as Item[];
    },

    findOneBy(id: number): Item | null {
        const row = db.prepare('SELECT * FROM itens WHERE id = ?').get(id);
        return row ? (row as Item) : null;
    },

    create(data: CreateItemDTO): Item {
        const stmt = db.prepare('INSERT INTO itens (name, quantity) VALUES  (?, ?)');
        const result = stmt.run(data.name, data.quantity);

        return {
            id: Number(result.lastInsertRowid),
            name: data.name,
            quantity: data.quantity
        };
    },

    update(id: number, data: UpdateItemDTO): Item | null {
        const fields: string[] = [];
        const values: (string | number )[] = [];

        if (data.name !== undefined) {
            fields.push('name = ?');
            values.push(data.name);       
        }

        if (data.quantity !== undefined) {
            fields.push('quantity = ?');
            values.push(data.quantity);
        }

        if (fields.length === 0) {
            return null
        }

        const query = `UPDATE itens SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);


        const stmt = db.prepare(query);
        const result = stmt.run(...values);

        if (result.changes === 0) {
            return null;
        }

        return this.findOneBy(id);
    },

    delete(id: number): boolean {
        const stmt = db.prepare('DELETE FROM itens WHERE id = ?');
        const result = stmt.run(id);       

        return result.changes > 0;
    }
}