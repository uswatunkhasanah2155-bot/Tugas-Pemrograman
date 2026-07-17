const nilai = [85 , 60, 98, 75, 40, 100];
for (let i = 0; i < nilai.length; i++){
    if (nilai [i] >= 70) {
        console.log("Nilai " + nilai[i] + " -> Lulus");
    } else {
        console.log("Nilai " + nilai [i] + " -> Tidak Lulus");
    }
}