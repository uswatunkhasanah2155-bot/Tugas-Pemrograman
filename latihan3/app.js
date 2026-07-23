const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Setting Template Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Dummy
const books = [
  { id: 1, title: "Laskar Pelangi", authorId: 1 },
  { id: 2, title: "Bumi Manusia", authorId: 2 }
];

const authors = [
  { id: 1, name: "Andrea Hirata" },
  { id: 2, name: "Pramoedya Ananta Toer" }
];

// Rute Utama dengan Filter
app.get('/', (req, res) => {
  const filter = req.query.filter;
  res.render('index', { 
    title: "Katalog Buku & Penulis",
    books, 
    authors,
    filter 
  });
});

// Rute Halaman Tambah Buku
app.get('/buku/tambah', (req, res) => {
  res.render('tambah');
});

// Rute Halaman Edit (Mengirim data authors agar nama penulis terbaca di form)
app.get('/buku/edit/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan");
  res.render('edit', { book, authors });
});

// API Endpoints
app.get('/api/books', (req, res) => {
  res.json({ success: true, data: books });
});

// API Endpoint Proses Tambah Buku (POST) dengan Nama Penulis
app.post('/api/books', (req, res) => {
  const { title, authorName } = req.body;
  
  if (!title || !authorName) {
    return res.status(400).json({ success: false, message: "Judul dan Nama Penulis wajib diisi" });
  }

  // Cek apakah penulis sudah ada di data (berdasarkan nama, mengabaikan huruf besar/kecil)
  let author = authors.find(a => a.name.toLowerCase() === authorName.trim().toLowerCase());

  // Jika penulis belum ada, buat penulis baru secara otomatis
  if (!author) {
    const newAuthorId = authors.length > 0 ? authors[authors.length - 1].id + 1 : 1;
    author = { id: newAuthorId, name: authorName.trim() };
    authors.push(author);
  }

  // Buat buku baru dengan mengaitkannya ke author.id
  const newBookId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  const newBook = { id: newBookId, title: title.trim(), authorId: author.id };
  
  books.push(newBook);
  
  res.json({ success: true, message: "Buku dan penulis berhasil ditambahkan", data: newBook });
});

// API Endpoint Proses Update Buku (PUT) dengan Nama Penulis
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, authorName } = req.body;
  
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });

  if (title) book.title = title.trim();

  if (authorName) {
    // Cek apakah penulis sudah ada (berdasarkan nama)
    let author = authors.find(a => a.name.toLowerCase() === authorName.trim().toLowerCase());

    // Jika penulis baru diketik dan belum ada di list, buat data penulis baru
    if (!author) {
      const newAuthorId = authors.length > 0 ? authors[authors.length - 1].id + 1 : 1;
      author = { id: newAuthorId, name: authorName.trim() };
      authors.push(author);
    }

    book.authorId = author.id;
  }

  res.json({ success: true, message: "Buku berhasil diupdate", data: book });
});

// API Endpoint Hapus Buku
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  
  if (index === -1) return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });

  const deletedBook = books.splice(index, 1);
  res.json({ success: true, message: "Buku berhasil dihapus", data: deletedBook });
});

// API Endpoint Hapus Penulis
app.delete('/api/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === authorId);
  
  if (index === -1) return res.status(404).json({ success: false, message: "Penulis tidak ditemukan" });

  const deletedAuthor = authors.splice(index, 1);
  res.json({ success: true, message: "Penulis berhasil dihapus", data: deletedAuthor });
});

app.get('/api/authors', (req, res) => {
  res.json({ success: true, data: authors });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});