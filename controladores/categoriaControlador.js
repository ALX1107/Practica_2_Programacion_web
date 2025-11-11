import * as categoria from '../modelos/categoria.js';

// ejercicio1
export const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });

    try {
        const id = await categoria.insertaCategoria(nombre, descripcion);
        res.status(201).json({ id, nombre, message: "Categoría creada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio2
export const getCategorias = async (req, res) => {
    try {
        const categorias = await categoria.obtenerTodasCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio3
export const getCategoriaById = async (req, res) => {
    try {
        const categoria = await categoria.obtenerCategoriaConProductos(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada." });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio4
export const updateCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });

    try {
        const affectedRows = await categoria.actualizaCategoria(req.params.id, nombre, descripcion);
        if (affectedRows === 0) return res.status(404).json({ message: "Categoría no encontrada para actualizar." });
        res.status(200).json({ message: "Categoría actualizada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ejercicio5
export const deleteCategoria = async (req, res) => {
    try {
        const affectedRows = await categoria.eliminaCategoria(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ message: "Categoría no encontrada para eliminar." });
        // Gracias a ON DELETE CASCADE, los productos asociados también fueron eliminados.
        res.status(200).json({ message: "Categoría y sus productos eliminados exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};