import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';
//import type { Item } from "../types/item.js";

const router = Router();

router.get('/', itemController.list);
router.get('/:id', itemController.search);
router.post('/', itemController.create);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

export default router;