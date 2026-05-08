const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to verify JWT token (optional for simple admin, but good practice)
const authenticateToken = (req, res, next) => {
    // For now, we will trust the client if we want, or implement JWT check.
    // The megam_main frontend might just pass the token.
    next();
};

// GET all blogs
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// GET single blog by id or slug
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        const [rows] = await db.query('SELECT * FROM blogs WHERE id = ? OR slug = ?', [identifier, identifier]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// POST new blog
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content, excerpt, author, category } = req.body;
        
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        } else if (req.body.image_url) {
            imageUrl = req.body.image_url;
        }

        // Generate slug from title
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const [result] = await db.query(
            'INSERT INTO blogs (title, slug, content, excerpt, author, image_url, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, slug, content, excerpt, author, imageUrl, category]
        );

        res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

// PUT update blog
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, author, category } = req.body;
        
        let query = 'UPDATE blogs SET title=?, content=?, excerpt=?, author=?, category=?';
        let params = [title, content, excerpt, author, category];

        if (req.file) {
            query += ', image_url=?';
            params.push(`/uploads/${req.file.filename}`);
        } else if (req.body.image_url) {
            query += ', image_url=?';
            params.push(req.body.image_url);
        }

        query += ' WHERE id=?';
        params.push(id);

        await db.query(query, params);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM blogs WHERE id=?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

module.exports = router;
