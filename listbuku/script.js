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

  // Loop setiap data di dalam array beserta index-nya
  dataBuku.forEach((buku, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '8px';

    // Buat elemen teks nama buku
    const spanNama = document.createElement('span');
    spanNama.textContent = buku.nama + ' ';
    li.appendChild(spanNama);

    // --- TOMBOL EDIT ---
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.style.marginLeft = '8px';
    btnEdit.addEventListener('click', () => editBuku(index));
    li.appendChild(btnEdit);

    // --- TOMBOL HAPUS ---
    const btnHapus = document.createElement('button');
    btnHapus.textContent = 'Hapus';
    btnHapus.style.marginLeft = '4px';
    btnHapus.addEventListener('click', () => hapusBuku(index));
    li.appendChild(btnHapus);

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

// 6. Fungsi Edit Buku
function editBuku(index) {
  const namaBaru = prompt('Ubah nama buku:', dataBuku[index].nama);
  
  // Jika user mengisi nama baru dan tidak menekan cancel
  if (namaBaru !== null && namaBaru.trim() !== '') {
    dataBuku[index].nama = namaBaru.trim();
    
    // SIMPAN PERUBAHAN & UPDATE TAMPILAN
    simpanKeLocalStorage();
    tampilkanData();
  }
}

// 7. Fungsi Hapus Buku (Menggunakan .splice())
function hapusBuku(index) {
  if (confirm(`Yakin ingin menghapus "${dataBuku[index].nama}"?`)) {
    // Hapus 1 data berdasarkan posisi index
    dataBuku.splice(index, 1);

    // SIMPAN PERUBAHAN & UPDATE TAMPILAN
    simpanKeLocalStorage();
    tampilkanData();
  }
}

// 8. Jalankan fungsi tambahBuku saat tombol "Tambah" diklik
btnTambah.addEventListener('click', tambahBuku);

// 9. Panggil tampilkanData() saat halaman pertama kali dibuka
// Agar data yang sudah ada di localStorage langsung muncul
tampilkanData();