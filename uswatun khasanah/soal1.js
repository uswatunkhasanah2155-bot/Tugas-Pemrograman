// 1. Membuat object student sesuai ketentuan
const student = {
    nama: "Budi",
    umur: 20,
    jurusan: "Teknik Informatika",
    status: "Belum",
    hobi: ["Garming", "Membaca", "Ngoding"],
}

//2. Menampilkan output biodata ke konsol
console.log("Nama: " + student.nama);
console.log("Umur: " + student.umur);
console.log("Jurusan: " + student.jurusan);
console.log("Status: " + student.status);
//3. Mengubah boolean menjadi text "Sudah" atau "Belum"
console.log("Hobi:");
for (let i = 0; i < student.hobi.length; i++) {
    console.log((i + 1) + ". " + student.hobi[i]);
}