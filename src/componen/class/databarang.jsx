import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import app from './../../firebase';
import { getDatabase, ref, onValue, update, remove } from "firebase/database";




const InputBarang = () => {
    const [dataBarang, setDataBarang] = useState([]);
    const [stok, setStok] = useState('');
    const [namaBarang, setNamaBarang] = useState('');
    const [harga, setHarga] = useState('');
    const [id, setId] = useState('');
    const [namaTombol, setNamaTombol] = useState('Simpan');

    const handEditButton = (data) => {
        const Barang = dataBarang.find((barang) => barang.id === data);
        setStok(Barang.stok);
        setNamaBarang(Barang.namaBarang);
        setHarga(Barang.harga);
        setId(Barang.id);
        setNamaTombol('Ubah');
    };

    const clearState = () => {
        setStok('');
        setNamaBarang('');
        setHarga('');
        setId('');
        setNamaTombol('Simpan');
    };

    const handleSumbitbuttom = () => {
        if (namaTombol === 'Ubah') {
            const db = getDatabase(app);
            const dbref = ref(db, 'barang/' + id);
            const data = {
              stok: stok,
              namaBarang: namaBarang,
              harga: harga,
           
            }
            // console.log(data);
            update(dbref, data )
            .then(() => {
            //   alert('data berhasil masuk update')
              // Data saved successfully!
            })
              .catch((error) => {
                alert('data gagal')
                // The write failed...
              });;
            clearState();

        } else {
            const barangBaru = {
                id: Math.floor(Math.random() * 10000),
                stok,
                namaBarang,
                harga,
            };
            if (namaBarang.trim() === '') {
                alert('Maaf, Nama Barang Kosong');
            } else {
                setDataBarang([...dataBarang, barangBaru]);
                console.log(barangBaru);
                const myFetch = async () => {
                    let url =
                      "https://databarangs-default-rtdb.asia-southeast1.firebasedatabase.app/barang.json";  
                   try {
                     let response = await fetch(url, {
                       method: "POST",
                       body: JSON.stringify(barangBaru),
                     });
                    //  alert("Data berhasil dikirim");
                     if (!response.ok) {
                       throw new Error(response.status);
                     }
                   } catch (error) {
                     console.log(
                       `Terjadi gangguan dengan pesan:"${error}"`
                     );
                   }
                 };
                 myFetch();
                setStok('');
                setNamaBarang('');
                setHarga('');
            }
        }
    };

    const handleDeleteButton = (data) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
            // const newdataBarang = dataBarang.filter((barang) => barang.id !== data);
            // setDataBarang(newdataBarang);
            // clearState();
            const db = getDatabase(app);
            const starCountRef = ref(db, 'barang/' + data);
        
            remove(starCountRef, { data }
            ).then(() => {
              alert('data berhasil dihapus')
              // Data saved successfully!
            })
              .catch((error) => {
                alert('data gagal hapus')
                // The write failed...
              });;
            clearState();
        
        }
    };

    useEffect(() => {
        
        let url = "https://project-react-1420e-default-rtdb.asia-southeast1.firebasedatabase.app/barang.json";

        const myFetch = async () => {
            try {
                const db = getDatabase(app);
                const starCountRef = ref(db, 'barang/');
                onValue(starCountRef, (snapshot) => {
                  const responseData = snapshot.val();
                let Barang=[];
               
for ( let key in responseData) {
    Barang.push({
        id:key,
        stok: responseData[key].stok,
        namaBarang: responseData[key].namaBarang,
        harga: responseData[key].harga,
    })
}
setDataBarang(Barang);
});

            } catch (error) {
                console.log(`EROR WOY!: "${error}" `);
            }
        };
        const db = getDatabase(app);
        const starCountRef = ref(db, 'barang/');
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
         console.log (data)
        });
        
        myFetch()
    },[]);
   
    return (
        <>
            <Container>
                <h1>Daftar Barang</h1>
                <Table bordered borderless hover responsive size="sm" striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Stok</th>
                            <th>Nama Barang</th>
                            <th>Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBarang.map((barang, i) => (
                            <tr key={barang.id}>
                                <th scope="row">{i + 1}</th>
                   
                                <td>{barang.stok}</td>
                                <td>{barang.namaBarang}</td>
                                <td>{barang.harga}</td>
                                <td>
                                    <div>
                                        <Button color="primary" onClick={() => handEditButton(barang.id)}>
                                            Ubah
                                        </Button>
                                        <Button color="danger" onClick={() => handleDeleteButton(barang.id)}>
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form>
                    <FormGroup>
                        <Label for="stokInput">Stok</Label>
                        <Input
                            id="stokInput"
                            name="Tulis stok"
                            placeholder="Tulis Stok"
                            type="number"
                            value={stok}
                            onChange={(e) => setStok(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaBarangInput">Nama Barang</Label>
                        <Input
                            id="namaBarangInput"
                            name="Tulis nama barang"
                            placeholder="Tulis Nama Barang"
                            type="text"
                            value={namaBarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hargaInput">Harga</Label>
                        <Input
                            id="hargaInput"
                            name="Tulis harga"
                            placeholder="Tulis Harga"
                            type="number"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                        />
                    </FormGroup>
                    <Button onClick={handleSumbitbuttom}>{namaTombol}</Button>
                </Form>
            </Container>
        </>
    );
};

export default  InputBarang;