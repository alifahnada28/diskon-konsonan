// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

const DiskonKonsonan = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleHitung = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);
    if (isNaN(harga) || harga <= 0 || !nama.trim()) {
      alert('Masukkan total harga (> 0) dan nama pelanggan dengan benar!');
      return;
    }

    const namaBersih = nama.trim();

    // Hitung huruf konsonan (huruf selain A, E, I, O, U dan spasi)
    const jumlahKonsonan = namaBersih
      .toLowerCase()
      .split('')
      .filter((c) => /[a-z]/.test(c) && !'aeiou'.includes(c)).length;

    // Hitung jumlah kata
    const jumlahKata = namaBersih.split(/\s+/).length;

    // Hitung persentase diskon
    let persen = jumlahKonsonan * 2;
    if (jumlahKata > 2) persen += 5;
    if (persen > 20) persen = 20;

    const potongan = (harga * persen) / 100;
    const hargaAkhir = harga - potongan;

    setHasil({ jumlahKonsonan, jumlahKata, persen, potongan, hargaAkhir });
  };

  return (
    <div className="container">
      <h2>Program Diskon Huruf Konsonan</h2>
      <form onSubmit={handleHitung} className="form">
        <label className="label">
          Total Harga Pembelian:
          <input
            type="number"
            className="input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Contoh: 100000"
          />
        </label>

        <label className="label">
          Nama Pelanggan:
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Budi Santoso"
          />
        </label>

        <button type="submit" className="button">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="result">
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persen}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.potongan)}</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;
