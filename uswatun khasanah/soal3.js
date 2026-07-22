const products = [ 
    {
        name:  "Indomie",
        price: 3500,
        stock: 10,
    },
    {
        name:  "Susu",
        price: 18000,
        stock: 0,
    },
    {
        name:  "Roti",
        price:  12000,
        stock:  5,
    }
];

for (let i = 0; i < products.length; i++) {
  // DISINI PERBAIKANNYA: Ubah .nama menjadi .name
  console.log(products[i].name);

  // DISINI PERBAIKANNYA: Ubah .harga menjadi .price
  console.log("Harga : " + products[i].price);

  if (products[i].stock > 0) {
    console.log("Status : Tersedia");
  } else {
    console.log("Status : Habis");
  }

  console.log("----------------");
}