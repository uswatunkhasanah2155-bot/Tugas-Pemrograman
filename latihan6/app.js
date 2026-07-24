const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk membaca JSON dari body request POST
app.use(express.json());

// ================= ENDPOINT KONVERSI SUHU DINAMIS (POST) =================
app.post('/api/convert', (req, res) => {
  let { value, from, to } = req.body;

  // 1. Validasi parameter wajib ada
  if (value === undefined || !from || !to) {
    return res.status(400).json({ 
      success: false, 
      message: "Parameter 'value', 'from', dan 'to' wajib diisi di dalam JSON body." 
    });
  }

  // 2. Bersihkan dan konversi input 'value' agar menjadi angka (menghapus kutip, spasi, dll)
  const cleanedValue = String(value).replace(/['"]/g, "").trim();
  const numericValue = Number(cleanedValue);

  // 3. Validasi apakah input benar-benar angka (jika huruf seperti 'Acelcius' akan ditolak)
  if (isNaN(numericValue)) {
    return res.status(400).json({ 
      success: false, 
      message: `Nilai value '${value}' tidak valid. Harus berupa angka (integer/float), tidak boleh mengandung huruf.` 
    });
  }

  const f = from.toLowerCase();
  const t = to.toLowerCase();
  let result = 0;

  // Rumus Konversi Universal (Celsius sebagai basis antara)
  let tempInCelsius = 0;
  if (f === 'c') {
    tempInCelsius = numericValue;
  } else if (f === 'f') {
    tempInCelsius = (numericValue - 32) * 5/9;
  } else if (f === 'r') {
    tempInCelsius = numericValue * 5/4;
  } else if (f === 'k') {
    tempInCelsius = numericValue - 273.15;
  } else {
    return res.status(400).json({ success: false, message: "Satuan asal ('from') tidak dikenal. Gunakan: c, f, r, atau k" });
  }

  // Konversi dari Celsius ke satuan tujuan ('to')
  if (t === 'c') {
    result = tempInCelsius;
  } else if (t === 'f') {
    result = (tempInCelsius * 9/5) + 32;
  } else if (t === 'r') {
    result = tempInCelsius * 4/5;
  } else if (t === 'k') {
    result = tempInCelsius + 273.15;
  } else {
    return res.status(400).json({ success: false, message: "Satuan tujuan ('to') tidak dikenal. Gunakan: c, f, r, atau k" });
  }

  // Respon JSON sukses
  res.json({
    success: true,
    input: {
      value: numericValue,
      from_unit: f.toUpperCase()
    },
    output: {
      result: parseFloat(result.toFixed(2)),
      to_unit: t.toUpperCase()
    },
    message: `Berhasil mengkonversi ${numericValue}°${f.toUpperCase()} ke ${t.toUpperCase()}`
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});