const students = [
  {
    name: "Andi",
    score: 90
  },
  {
    name: "Budi",
    score: 65
  },
  {
    name: "Caca",
    score: 80
  },
  {
    name: "Dina",
    score: 55
  }
];

let totalScore = 0;
let lulusCount = 0;
let tidakLulusCount = 0;

students.forEach((student) => {
  // 1. Menentukan Grade
  let grade = "";
  if (student.score >= 90 && student.score <= 100) {
    grade = "A";
  } else if (student.score >= 80 && student.score <= 89) {
    grade = "B";
  } else if (student.score >= 70 && student.score <= 79) {
    grade = "C";
  } else {
    grade = "D";
  }

  // 2. Menghitung Jumlah Lulus & Tidak Lulus
  if (student.score >= 70) {
    lulusCount++;
  } else {
    tidakLulusCount++;
  }

  // 3. Menghitung Total Nilai untuk Rata-rata
  totalScore += student.score;

  // 4. Menampilkan Data Tiap Siswa
  console.log(`Nama  : ${student.name}`);
  console.log(`Nilai : ${student.score}`);
  console.log(`Grade : ${grade}\n`);
});

// 5. Menghitung Rata-rata Nilai
const rataRata = totalScore / students.length;

// 6. Menampilkan Rekapitulasi Akhir
console.log("==================");
console.log(`Jumlah Siswa : ${students.length}`);
console.log(`Lulus : ${lulusCount}`);
console.log(`Tidak Lulus : ${tidakLulusCount}`);
console.log(`Rata-rata : ${rataRata}`);