const cart = [
  {
    name: "Mouse",
    price: 120000,
    qty: 2
  },
  {
    name: "Keyboard",
    price: 250000,
    qty: 1
  },
  {
    name: "Flashdisk",
    price: 90000,
    qty: 3
  }
];

let totalBelanja = 0;

// 1. Menampilkan detail setiap barang dan menghitung total belanja
cart.forEach((item) => {
  const subtotal = item.price * item.qty;
  totalBelanja += subtotal;

  console.log(item.name);
  console.log(`${item.price} x ${item.qty} = ${subtotal}\n`);
});

// 2. Menghitung diskon berdasarkan aturan (jika > 500.000 diskon 10%)
let diskon = 0;
if (totalBelanja > 500000) {
  diskon = totalBelanja * 0.1; // 10%
}

// 3. Menghitung total bayar setelah diskon
const totalBayar = totalBelanja - diskon;

// 4. Menampilkan rekapitulasi akhir pembayaran
console.log("--------------------");
console.log(`Total Belanja : ${totalBelanja}`);
console.log(`Diskon : ${diskon}`);
console.log(`Total Bayar : ${totalBayar}`);