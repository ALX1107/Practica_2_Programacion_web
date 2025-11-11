// Importa tu objeto de conexión a la BD (ej. 'db')
import { db } from '../config/db.js'; 

// 1. POST /categorias
export const insertaCategoria = async (nombre, descripcion) => {
    const [resultado] = await db.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return resultado.insertId;
};

// 2. GET /categorias
export const obtenerTodasCategorias = async () => {
    const [filas] = await db.query('SELECT * FROM categorias');
    return filas;
};

// 3. GET /categorias/:id (con productos)
export const obtenerCategoriaConProductos = async (id) => {
    // a. Obtener la categoría
    const [categoria] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    
    if (categoria.length === 0) return null;

    // b. Obtener los productos asociados
    const [productos] = await db.query(
        'SELECT * FROM productos WHERE categoria_id = ?', 
        [id]
    );
    
    // c. Combinar y devolver
    return { ...categoria[0], productos };
};

// 4. PUT /categorias/:id
export const actualizaCategoria = async (id, nombre, descripcion) => {
    const [resultado] = await db.query(
        'UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [nombre, descripcion, id]
    );
    return resultado.affectedRows;
};

// 5. DELETE /categorias/:id
export const eliminaCategoria = async (id) => {
    // La eliminación de productos es automática (ON DELETE CASCADE)
    const [resultado] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    return resultado.affectedRows;
};