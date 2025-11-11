import * as producto from '../modelos/producto.js';

// ejercicio6. POST /productos
export const createProducto = async (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ message: "Faltan datos obligatorios (nombre, precio, stock, categoria_id)." });
    }
    try {
        const id = await producto.insertaProducto(nombre, precio, stock, categoria_id);
        res.status(201).json({ id, nombre, message: "Producto creado exitosamente." });
    } catch (error) {
        // Podría ser un error 500 o 400 si categoria_id no existe (Foreign Key Constraint)
        res.status(500).json({ error: error.message });
    }
};

// ejercicio7. GET /productos
export const getProductos = async (req, res) => {
    try {
        const productos = await producto.obtenerTodosProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio8. GET /productos/:id
export const getProductoById = async (req, res) => {
    try {
        const producto = await producto.obtenerProductoPorId(req.params.id);
        if (!producto) return res.status(404).json({ message: "Producto no encontrado." });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio9. PUT /productos/:id
export const updateProducto = async (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ message: "Faltan datos obligatorios para la actualización." });
    }
    try {
        const affectedRows = await producto.actualizaProducto(req.params.id, nombre, precio, stock, categoria_id);
        if (affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado para actualizar." });
        res.status(200).json({ message: "Producto actualizado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio10. PATCH /productos/:id/stock
export const patchStock = async (req, res) => {
    const { cantidad } = req.body;
    // Valida que 'cantidad' sea un número válido y no cero
    if (typeof cantidad !== 'number' || cantidad === 0) {
        return res.status(400).json({ message: "Se requiere un valor numérico 'cantidad' (positivo o negativo) válido." });
    }
    try {
        const affectedRows = await producto.actualizaStock(req.params.id, cantidad);
        if (affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado o stock no actualizado." });
        res.status(200).json({ message: `Stock actualizado en ${cantidad} unidades.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};