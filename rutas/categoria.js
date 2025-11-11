import { Router } from 'express';
// Importa los controladores que creamos previamente
import { 
    createCategoria, 
    getCategorias, 
    getCategoriaById, 
    updateCategoria, 
    deleteCategoria 
} from '../controladores/categoriaControlador.js'; 

const router = Router();

// Rutas base: /categorias
// 1. POST /categorias
router.post('/', createCategoria); 
// 2. GET /categorias
router.get('/', getCategorias); 

// Rutas con ID: /categorias/:id
// 3. GET /categorias/:id
router.get('/:id', getCategoriaById); 
// 4. PUT /categorias/:id
router.put('/:id', updateCategoria); 
// 5. DELETE /categorias/:id
router.delete('/:id', deleteCategoria); 

export default router;