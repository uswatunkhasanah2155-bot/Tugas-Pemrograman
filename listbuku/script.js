// 1. Ambil data dari localStorage saat halaman pertama kali dimuat.
// Jika belum ada data tersimpan, gunakan Array kosong [].
// JSON.parse digunakan untuk mengubah string teks kembali menjadi Array/Object.
let dataBuku = JSON.parse(localStorage.getItem('daftarBukuSimpanan')) || [];

// 2. Ambil elemen DOM dari HTML
const inputBuku = document.querySelector('input[name="nama_buku"]');
const btnTambah = document.getElementById('tambah');
const listBuku = document.querySelector('.data-buku');

// 3. Fungsi untuk menyimpan data array ke LocalStorage
function simpanKeLocalStorage() {
  // JSON.stringify digunakan karena localStorage hanya bisa menyimpan teks (string)
  localStorage.setItem('daftarBukuSimpanan', JSON.stringify(dataBuku));
}

// 4. Fungsi untuk menampilkan data ke daftar (<ul>)
function tampilkanData() {
  // Kosongkan tampilan ul terlebih dahulu
  listBuku.innerHTML = '';

  // Loop setiap data di dalam array
  dataBuku.forEach((buku) => {
    const li = document.createElement('li');
    li.textContent = buku.nama; // Menampilkan nama buku
    listBuku.appendChild(li);
  });
}

// 5. Fungsi Tambah Buku (Menggunakan .push())
function tambahBuku() {
  const teksBuku = inputBuku.value.trim();

  // Validasi jika input kosong
  if (teksBuku === '') {
    alert('Nama buku tidak boleh kosong!');
    return;
  }

  // Membuat object buku baru
  const bukuBaru = {
    id: Date.now(),
    nama: teksBuku
  };

  // Menambahkan object ke dalam Array memakai .push()
  dataBuku.push(bukuBaru);

  // SIMPAN PERUBAHAN KE LOCALSTORAGE
  simpanKeLocalStorage();

  // Kosongkan kolom input
  inputBuku.value = '';

  // Perbarui tampilan di layar
  tampilkanData();
}

// 6. Jalankan fungsi tambahBuku saat tombol "Tambah" diklik
btnTambah.addEventListener('click', tambahBuku);

// 7. Panggil tampilkanData() saat halaman pertama kali dibuka
// Agar data yang sudah ada di localStorage langsung muncul
tampilkanData();