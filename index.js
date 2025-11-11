import express from 'express';
// Importa los routers separados
import categoria from './rutas/categoria.js'; 
import producto from './rutas/productos.js'; 

const app = express();
const port = 3000;

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// --- Uso de las Rutas Separadas ---

// Monta las rutas de Categorías bajo el prefijo /categorias
app.use('/categorias', categoria); 

// Monta las rutas de Productos bajo el prefijo /productos
app.use('/productos', producto); 

// ------------------------------------

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});