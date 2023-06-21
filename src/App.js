// import React, { useState } from 'react';

// function App() {
//   const [barang, setBarang] = useState({
//     nama: '',
//     stok: 0
//   });

//   const [penambahan, setPenambahan] = useState(0);
//   const [pengurangan, setPengurangan] = useState(0);

//   const handleNamaChange = (event) => {
//     setBarang({ ...barang, nama: event.target.value });
//   };

//   const handleStokChange = (event) => {
//     setBarang({ ...barang, stok: Number(event.target.value) });
//   };

//   const handlePenambahanChange = (event) => {
//     setPenambahan(Number(event.target.value));
//   };

//   const handlePenguranganChange = (event) => {
//     setPengurangan(Number(event.target.value));
//   };

//   const tambahStok = () => {
//     setBarang({ ...barang, stok: barang.stok + penambahan });
//   };

//   const kurangStok = () => {
//     setBarang({ ...barang, stok: barang.stok - pengurangan });
//   };

//   return (
//     <div>
//       <h1>Data Penambahan dan Pengurangan Barang</h1>
//       <label>
//         Nama Barang:
//         <input type="text" value={barang.nama} onChange={handleNamaChange} />
//       </label>
//       <br />
//       <label>
//         Stok Barang:
//         <input type="number" value={barang.stok} onChange={handleStokChange} />
//       </label>
//       <br />
//       <label>
//         Penambahan Stok:
//         <input type="number" value={penambahan} onChange={handlePenambahanChange} />
//       </label>
//       <button onClick={tambahStok}>Tambah Stok</button>
//       <br />
//       <label>
//         Pengurangan Stok:
//         <input type="number" value={pengurangan} onChange={handlePenguranganChange} />
//       </label>
//       <button onClick={kurangStok}>Kurang Stok</button>
//     </div>
//   );
// }

// export default App;
