// database.js
import mysql from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app-libros'
};

export const pool = mysql.createPool(properties);
