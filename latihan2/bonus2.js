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
// BONUS CHALLENGE
// ==========================================
console.log("\n=== BONUS CHALLENGE ===");

// 1. Dataset Kategori
const categories = [
  { id: 1, name: "Programming" },
  { id: 2, name: "Self Improvement" },
  { id: 3, name: "Novel" }
];

// 2. Menambahkan relasi categoryId ke data buku
const booksWithCategory = books.map(book => {
  let categoryId = 1; // Default Programming
  if (book.title === "Atomic Habits") categoryId = 2; // Self Improvement
  if (book.title === "Laskar Pelangi") categoryId = 3; // Novel

  return { ...book, categoryId };
});

// Fitur A: Menampilkan nama kategori pada setiap buku
console.log("--- Detail Kategori Tiap Buku ---");
booksWithCategory.forEach(book => {
  const category = categories.find(c => c.id === book.categoryId);
  console.log(`${book.title} -> Kategori: ${category ? category.name : "Tanpa Kategori"}`);
});

// Fitur B: Menghitung jumlah buku pada setiap kategori
console.log("\n--- Jumlah Buku Per Kategori ---");
categories.forEach(cat => {
  const count = booksWithCategory.filter(b => b.categoryId === cat.id).length;
  console.log(`${cat.name}: ${count} buku`);
});

// Fitur C: Menampilkan kategori yang memiliki buku terbanyak
console.log("\n--- Kategori Terbanyak ---");
const categoryCounts = categories.map(cat => ({
  name: cat.name,
  count: booksWithCategory.filter(b => b.categoryId === cat.id).length
}));

const topCategory = categoryCounts.reduce((prev, curr) => (prev.count > curr.count) ? prev : curr);
console.log(`Kategori Terbanyak: ${topCategory.name} (${topCategory.count} buku)`);