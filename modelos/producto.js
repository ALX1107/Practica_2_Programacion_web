// Importa tu objeto de conexión a la BD (ej. 'db')
import { db } from '../config/db.js'; 

// 6. POST /productos
export const insertaProducto = async (nombre, precio, stock, categoria_id) => {
    const [resultado] = await db.query(
        'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, precio, stock, categoria_id]
    );
    return resultado.insertId;
};

// 7. GET /productos (con nombre de categoría)
export const obtenerTodosProductos = async () => {
    const [filas] = await db.query(`
        SELECT 
            p.*, 
            c.nombre AS nombre_categoria
        FROM 
            productos p
        JOIN 
            categorias c ON p.categoria_id = c.id
    `);
    return filas;
};

// 8. GET /productos/:id (con nombre de categoría)
export const obtenerProductoPorId = async (id) => {
    const [filas] = await db.query(`
        SELECT 
            p.*, 
            c.nombre AS nombre_categoria
        FROM 
            productos p
        JOIN 
            categorias c ON p.categoria_id = c.id
        WHERE p.id = ?
    `, [id]);
    return filas[0];
};

// 9. PUT /productos/:id
export const actualizaProducto = async (id, nombre, precio, stock, categoria_id) => {
    const [resultado] = await db.query(
        `UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?`,
        [nombre, precio, stock, categoria_id, id]
    );
    return resultado.affectedRows;
};

// 10. PATCH /productos/:id/stock
export const actualizaStock = async (id, cantidad) => {
    const [resultado] = await db.query(
        `UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?`,
        [cantidad, id] // 'cantidad' puede ser positiva (incrementar) o negativa (decrementar)
    );
    return resultado.affectedRows;
};