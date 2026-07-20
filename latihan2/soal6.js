// ==========================================
// DATA AWAL (Jangan diubah struktur data utamanya)
// ==========================================
const authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

const books = [
  { id: 1, title: "Clean Code", authorId: 1, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, year: 2005, available: true }
];


// ==========================================
// TASK 6 - Menampilkan Detail Buku
// (Branch: task-6)
// ==========================================
console.log("=== TASK 6: DETAIL BUKU ===");

books.forEach(book => {
  const author = authors.find(a => a.id === book.authorId);
  
  console.log(book.title);
  console.log(`Penulis: ${author ? author.name : "Tidak ditemukan"}`);
  console.log(`Negara ${author ? author.country : "-"}`);
  console.log(`Tahun ${book.year}`);
  console.log(`Status: ${book.available ? "Tersedia" : "Dipinjam"}`);
  console.log("-----------------------------------");
});


