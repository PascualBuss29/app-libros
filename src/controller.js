import { pool } from './database.js';

class LibroController {
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      console.error('Error al obtener todos los libros:', error);
      res.status(500).json({ error: 'Hubo un error al obtener los libros' });
    }
  }

  async add(req, res) {
    try {
      const libro = req.body;

      // Validación de datos antes de insertar
      if (!libro.nombre || !libro.autor || !libro.categoria || !libro.año_publicacion || !libro.ISBN) {
        return res.status(400).json({ error: 'Faltan atributos en la solicitud' });
      }

      const [result] = await pool.query(
        'INSERT INTO Libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?,?,?,?,?)',
        [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]
      );
      res.json({ "Id insertado": result.insertId });
    } catch (error) {
      console.error('Error al agregar un libro:', error);
      res.status(500).json({ error: 'Hubo un error al agregar el libro' });
    }
  }

  async delete(req, res) {
    try {
      const libro = req.body;

      // Validación de datos antes de eliminar
      if (!libro.id) {
        return res.status(400).json({ error: 'Falta el atributo "id" en la solicitud' });
      }

      // Comprueba si el libro con el ID proporcionado existe antes de eliminar
      const [checkResult] = await pool.query('SELECT id FROM Libros WHERE id=?', [libro.id]);

      if (checkResult.length === 0) {
        return res.status(404).json({ error: 'No se encontró ningún libro con el ID proporcionado' });
      }

      const [result] = await pool.query('DELETE FROM Libros WHERE id=?', [libro.id]);
      res.json({ "Registros eliminados": result.affectedRows });
    } catch (error) {
      console.error('Error al eliminar un libro:', error);
      res.status(500).json({ error: 'Hubo un error al eliminar el libro' });
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;

      // Validación de datos antes de actualizar
      if (!libro.id || !libro.nombre || !libro.autor || !libro.categoria || !libro.año_publicacion || !libro.ISBN) {
        return res.status(400).json({ error: 'Faltan atributos en la solicitud' });
      }

      const [result] = await pool.query('UPDATE Libros SET nombre=?, autor=?, categoria=?, año_publicacion=?, ISBN=? WHERE id=?', [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN, libro.id]);
      res.json({ "Registros actualizados": result.changedRows });
    } catch (error) {
      console.error('Error al actualizar un libro:', error);
      res.status(500).json({ error: 'Hubo un error al actualizar el libro' });
    }
  }

 
}

export const libro = new LibroController();


