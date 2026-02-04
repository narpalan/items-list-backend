export type Item = {
  id: number;
  name: string;
  quantity: number;
};

export type CreateItemDTO = Omit<Item, 'id'>;
export type UpdateItemDTO = Partial<CreateItemDTO>;