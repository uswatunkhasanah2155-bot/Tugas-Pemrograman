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
let books = [
  { id: 1, title: "Laskar Pelangi", authorId: 1 },
  { id: 2, title: "Bumi Manusia", authorId: 2 }
];

let authors = [
  { id: 1, name: "Andrea Hirata" },
  { id: 2, name: "Pramoedya Ananta Toer" }
];

// ================= RUTE HALAMAN UTAMA & VIEW =================
app.get('/', (req, res) => {
  res.render('index'); // Memuat kerangka HTML yang memiliki script fetch()
});

app.get('/buku/tambah', (req, res) => {
  res.render('tambah');
});

// Menangani rute edit untuk URL /edit/:id maupun /buku/edit/:id
app.get(['/edit/:id', '/buku/edit/:id'], (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan");
  res.render('edit', { book, authors });
});


// ================= ENDPOINT API BUKU (MUNCUL DI NETWORK INSPECT) =================
app.get('/api/books', (req, res) => {
  res.json(books); // Mengirim data JSON array books
});

app.post('/api/books', (req, res) => {
  const { title, authorName } = req.body;
  if (!title || !authorName) {
    return res.status(400).json({ success: false, message: "Judul dan Nama Penulis wajib diisi" });
  }

  let author = authors.find(a => a.name.toLowerCase() === authorName.trim().toLowerCase());
  if (!author) {
    const newAuthorId = authors.length > 0 ? authors[authors.length - 1].id + 1 : 1;
    author = { id: newAuthorId, name: authorName.trim() };
    authors.push(author);
  }

  const newBookId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  const newBook = { id: newBookId, title: title.trim(), authorId: author.id };
  books.push(newBook);
  
  res.json({ success: true, message: "Buku berhasil ditambahkan", data: newBook });
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  
  if (index === -1) return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });

  books.splice(index, 1);
  res.json({ success: true, message: "Buku berhasil dihapus" });
});


// ================= ENDPOINT API PENULIS (MUNCUL DI NETWORK INSPECT) =================
app.get('/api/authors', (req, res) => {
  res.json(authors); // Mengirim data JSON array authors secara langsung
});

app.delete('/api/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === authorId);
  
  if (index === -1) return res.status(404).json({ success: false, message: "Penulis tidak ditemukan" });

  authors.splice(index, 1);
  res.json({ success: true, message: "Penulis berhasil dihapus" });
});


// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});