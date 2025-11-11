import { Router } from 'express';
// Importa los controladores que creamos previamente
import { 
    createProducto, 
    getProductos, 
    getProductoById, 
    updateProducto, 
    patchStock 
} from '../controladores/productoControlador.js'; 

const router = Router();

// Rutas base: /productos
// 6. POST /productos
router.post('/', createProducto); 
// 7. GET /productos
router.get('/', getProductos); 

// Rutas con ID: /productos/:id
// 8. GET /productos/:id
router.get('/:id', getProductoById); 
// 9. PUT /productos/:id
router.put('/:id', updateProducto); 

// 10. PATCH /productos/:id/stock
router.patch('/:id/stock', patchStock); 

export default router;