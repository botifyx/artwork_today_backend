require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function initDB() {
    try {
        console.log('Connecting to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT || 3306
        });

        console.log('Creating database if not exists...');
        await connection.query('CREATE DATABASE IF NOT EXISTS `artwork_today`');

        console.log('Using artwork_today...');
        await connection.query('USE `artwork_today`');

        console.log('Creating admin_users table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL
            )
        `);

        console.log('Creating blogs table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                content LONGTEXT NOT NULL,
                excerpt TEXT,
                author VARCHAR(100),
                image_url VARCHAR(255),
                category VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        const [rows] = await connection.query('SELECT * FROM admin_users WHERE username = ?', ['admin']);
        if (rows.length === 0) {
            console.log('Creating default admin user...');
            const hashedPassword = await bcrypt.hash('ArtworkToday#1', 10);
            await connection.query('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', ['admin', hashedPassword]);
            console.log('Default admin user created.');
        } else {
            console.log('Admin user already exists. Updating password...');
            const hashedPassword = await bcrypt.hash('ArtworkToday#1', 10);
            await connection.query('UPDATE admin_users SET password_hash = ? WHERE username = ?', [hashedPassword, 'admin']);
            console.log('Admin user password updated.');
        }

        console.log('Database initialization complete!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

initDB();
