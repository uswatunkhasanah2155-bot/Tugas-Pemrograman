// Data Penulis (Authors)
const authors = [
  { id: 1, name: "Tere Liye" },
  { id: 2, name: "Andrea Hirata" },
  { id: 3, name: "Dee Lestari" }
];

// Data Buku (Books)
const books = [
  { id: 101, title: "Bumi", authorId: 1 },
  { id: 102, title: "Bulan", authorId: 1 },
  { id: 103, title: "Matahari", authorId: 1 },
  { id: 104, title: "Laskar Pelangi", authorId: 2 },
  { id: 105, title: "Edensor", authorId: 2 },
  { id: 106, title: "Perahu Kertas", authorId: 3 }
];

// ==========================================
// TASK 7 - Statistik Penulis
// ==========================================
console.log("\n=== TASK 7: STATISTIK PENULIS ===");

authors.forEach(author => {
  const totalBooks = books.filter(book => book.authorId === author.id).length;
  
  console.log(author.name);
  console.log(`Jumlah Buku: ${totalBooks}`);
  console.log("-----------------------------------");
});