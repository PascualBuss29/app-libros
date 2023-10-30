import { Router } from "express";
import { libro } from './controller.js';

export const router = Router();

// Ruta para obtener todos los libros
router.get('/libros', libro.getAll);

// Ruta para obtener un libro por su ID
router.get('/libros/:id', libro.getOne);

// Ruta para agregar un libro
router.post('/libro', libro.add);

// Ruta para eliminar un libro por su ID
router.delete('/libro/:id', libro.delete);

// Ruta para eliminar un libro por su ISBN
router.delete('/libros/:ISBN', libro.deleteByISBN);

// Ruta para actualizar un libro por su ID
router.put('/libro/:id', libro.update);

// Ruta para actualizar un libro por su ISBN
router.put('/libros/:ISBN', libro.updateByISBN);
