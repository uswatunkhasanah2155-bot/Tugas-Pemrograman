const express = require('express');
const app = express();
const PORT = 3000;

// Middleware agar Express bisa membaca JSON dari request body
app.use(express.json());

// Data Dummy (In-Memory Data)
const books = [
  { id: 1, title: "Laskar Pelangi", authorId: 1 },
  { id: 2, title: "Bumi Manusia", authorId: 2 }
];

const authors = [
  { id: 1, name: "Andrea Hirata" },
  { id: 2, name: "Pramoedya Ananta Toer" }
];

// --- ENDPOINT BOOKS ---

// GET: Ambil semua buku
app.get('/api/books', (req, res) => {
  res.json({ success: true, data: books });
});

// GET: Ambil buku berdasarkan ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
  res.json({ success: true, data: book });
});

// POST: Tambah buku baru
app.post('/api/books', (req, res) => {
  const { title, authorId } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ success: false, message: "Title dan authorId wajib diisi" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    authorId
  };
  books.push(newBook);
  res.status(201).json({ success: true, data: newBook });
});

// --- ENDPOINT AUTHORS ---

// GET: Ambil semua penulis
app.get('/api/authors', (req, res) => {
  res.json({ success: true, data: authors });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});