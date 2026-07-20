const authors = [
  {
    id: 1,
    name: "Robert C. Martin",
    country: "USA"
  },
  {
    id: 2,
    name: "James Clear",
    country: "USA"
  },
  {
    id: 3,
    name: "Marijn Haverbeke",
    country: "Netherlands"
  },
  {
    id: 4,
    name: "Andrea Hirata",
    country: "Indonesia"
  }
];

const books = [
  {
    id: 1,
    title: "Clean Code",
    authorId: 1,
    year: 2008,
    available: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    authorId: 2,
    year: 2018,
    available: false
  },
  {
    id: 3,
    title: "Eloquent JavaScript",
    authorId: 3,
    year: 2019,
    available: true
  },
  {
    id: 4,
    title: "Laskar Pelangi",
    authorId: 4,
    year: 2005,
    available: true
  }
];

// ==========================================
// TASK 10 - Dashboard Perpustakaan
// ==========================================
console.log("\n=== TASK 10: LIBRARY DASHBOARD ===");

const totalBooks = books.length;
const totalAuthors = authors.length;
const availableBooks = books.filter(b => b.available).length;
const borrowedBooks = books.filter(b => !b.available).length;
const localAuthors = authors.filter(a => a.country === "Indonesia").length;
const foreignAuthors = authors.filter(a => a.country !== "Indonesia").length;

const newestBook = books.reduce((prev, curr) => (prev.year > curr.year) ? prev : curr);
const oldestBook = books.reduce((prev, curr) => (prev.year < curr.year) ? prev : curr);

console.log("LIBRARY DASHBOARD");
console.log(`Total Buku: ${totalBooks}`);
console.log(`Total Penulis: ${totalAuthors}`);
console.log(`Buku Tersedia: ${availableBooks}`);
console.log(`Buku Dipinjam: ${borrowedBooks}`);
console.log(`Penulis Indonesia: ${localAuthors}`);
console.log(`Penulis Luar Indonesia: ${foreignAuthors}`);
console.log(`Buku Terbaru: ${newestBook.title} (${newestBook.year})`);
console.log(`Buku Terlama: ${oldestBook.title} (${oldestBook.year})`);