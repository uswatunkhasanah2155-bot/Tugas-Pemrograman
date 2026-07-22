// 1. Array of Objects (Database Sementara)
let daftarBuku = [
  { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata" },
  { id: 2, judul: "Bumi", penulis: "Tere Liye" }
];

let editId = null;

// Mengambil Elemen DOM
const bookForm = document.getElementById('bookForm');
const judulInput = document.getElementById('judulInput');
const penulisInput = document.getElementById('penulisInput');
const bookTableBody = document.getElementById('bookTableBody');
const btnSave = document.getElementById('btnSave');
const btnCancel = document.getElementById('btnCancel');

// 2. Fungsi Render Data Array ke Tabel (DOM Manipulasi)
function renderBuku() {
  bookTableBody.innerHTML = ''; // Kosongkan isi tabel

  if (daftarBuku.length === 0) {
    bookTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Belum ada data buku.</td></tr>`;
    return;
  }

  // Perulangan array of objects untuk memasukkan data ke HTML
  daftarBuku.forEach((buku, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${buku.judul}</strong></td>
      <td>${buku.penulis}</td>
      <td class="text-center">
        <button class="btn-edit" onclick="persiapkanEdit(${buku.id})">Edit</button>
        <button class="btn-delete" onclick="hapusBuku(${buku.id})">Hapus</button>
      </td>
    `;
    bookTableBody.appendChild(tr);
  });
}

// 3. Tambah atau Update Data saat Form disubmit
bookForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah reload halaman!

  const judul = judulInput.value;
  const penulis = penulisInput.value;

  if (editId === null) {
    // TAMBAH BUKU (Menggunakan metode push otomatis)
    const bukuBaru = {
      id: Date.now(),
      judul: judul,
      penulis: penulis
    };
    daftarBuku.push(bukuBaru);
  } else {
    // EDIT BUKU
    const index = daftarBuku.findIndex(b => b.id === editId);
    if (index !== -1) {
      daftarBuku[index].judul = judul;
      daftarBuku[index].penulis = penulis;
    }
    resetForm();
  }

  // Clear Input & Render Ulang
  judulInput.value = '';
  penulisInput.value = '';
  renderBuku();
});

// 4. Hapus Buku (Delete)
function hapusBuku(id) {
  daftarBuku = daftarBuku.filter(b => b.id !== id);
  renderBuku();
}

// 5. Persiapkan Mode Edit
function persiapkanEdit(id) {
  const buku = daftarBuku.find(b => b.id === id);
  if (buku) {
    judulInput.value = buku.judul;
    penulisInput.value = buku.penulis;
    editId = buku.id;

    btnSave.textContent = 'Update';
    btnCancel.style.display = 'inline-block';
  }
}

// 6. Reset Form saat Batal Edit
btnCancel.addEventListener('click', resetForm);

function resetForm() {
  editId = null;
  judulInput.value = '';
  penulisInput.value = '';
  btnSave.textContent = 'Tambah';
  btnCancel.style.display = 'none';
}

// Tampilkan data pertama kali
renderBuku();