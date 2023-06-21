import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Datasiswas = [
    // {
    //     id: 1,
    //     nama: "Nanda",
    //     alamat: " semarang barat",
    //     Jurusan: "Agama",
    //     beasiswa: "False",
    //     jenkel: 'L',
    // },
    // {
    //     id: 2,
    //     nama: "Nana",
    //     alamat: "Jakarta tenggara",
    //     Jurusan: "Tataboga",
    //     beasiswa: "true",
    //     jenkel: 'p',
    // }
];

const Inputsiswa = () => {
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenkel, setJenkel] = useState('');
    const [Jurusan, setJurusan] = useState('');
    const [beasiswa, setBeasiswa] = useState(false);
    const [id, setId] = useState('');
    const [namaTombol, setNamaTombol] = useState('Simpan');

    const handEditButton = (data) => {
        const NewData = Datasiswas.filter((i) => i.id === data);
        console.log(NewData[0]);
        setNama(NewData[0].nama);
        setAlamat(NewData[0].alamat);
        setJenkel(NewData[0].jenkel);
        setBeasiswa(NewData[0].beasiswa);
        setJurusan(NewData[0].Jurusan);
        setId(NewData[0].id);
        setNamaTombol('Ubah');
    };

    const clearState = () => {
        setNama('');
        setAlamat('');
        setJenkel('');
        setBeasiswa(false);
        setJurusan('');
        setId('');
        setNamaTombol('Simpan');
    };

    const handleSumbitbuttom = () => {
        if (namaTombol === 'Ubah') {
            const result = Datasiswas.findIndex((a) => a.id === id);

            const newDataSiswas = [...Datasiswas];
            newDataSiswas.splice(result, 1, {
                id,
                nama,
                alamat,
                jenkel,
                beasiswa,
                Jurusan,
            });
            clearState();
        } else {
            const Siswabaru = {
                id: Math.floor(Math.random() * 10000),
                nama,
                alamat,
                jenkel,
                beasiswa,
                Jurusan,
            };
            if (nama.trim() === '') {
                alert('Maaf, Nama Kosong');
            } else {
                Datasiswas.push(Siswabaru);
                setNama('');
                setAlamat('');
                setJenkel('');
                setBeasiswa('');
                setJurusan('');
            }

            console.log(Siswabaru);
        }
    };

    const handleDeleteButton = (data) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
            const newDataSiswas = Datasiswas.filter((siswa) => siswa.id !== data);
            Datasiswas.length = 0;
            Datasiswas.push(...newDataSiswas);
            clearState();
        }
    };
    useEffect(() => {

        let url = "https://hanifproject-23f1d-default-rtdb.firebaseio.com/databarang.json";

        const myFetch = async () => {
            try {
                let response = await fetch(url, {
                    method: "GET",

                })
                alert("Data berhasil dikirim");
                if (!response.ok) {
                    throw new Error(response.status);
                }
            }
            catch (error) {
                console.log(`EROR WOY!: "${error}" `);
            }
        }
    })
    return (
        <>
            <Container>
                <h1>Daftar Siswa</h1>
                <Table bordered borderless hover responsive size="sm" striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Jenis Kelamin</th>
                            <th>Jurusan</th>
                            <th>Jalur Beasiswa</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Datasiswas.map((siswa, i) => (
                            <tr key={siswa.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{siswa.nama}</td>
                                <td>{siswa.alamat}</td>
                                <td>{siswa.jenkel}</td>
                                <td>{siswa.Jurusan}</td>
                                <td>{siswa.beasiswa.toString()}</td>
                                <td>
                                    <div>
                                        <Button color="primary" onClick={() => handEditButton(siswa.id)}>
                                            Ubah
                                        </Button>
                                        <Button color="danger" onClick={() => handleDeleteButton(siswa.id)}>
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
                        <Label for="exampleEmail">Nama</Label>
                        <Input
                            id="exampleEmail"
                            name="Tulis nama"
                            placeholder="Tulis Nama"
                            type="name"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Jurusan</Label>
                        <select
                            id="exampleSelect"
                            name="select"
                            type="select"
                            value={Jurusan}
                            onChange={(e) => setJurusan(e.target.value)}
                        >
                            <option>Informatika</option>
                            <option>Tataboga</option>
                            <option>Seni dan Budaya</option>
                            <option>Politik</option>
                            <option>Agama</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Alamat</Label>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Jenis Kelamin</legend>
                        <FormGroup check>
                            <Input
                                name="radio1"
                                type="radio"
                                checked={jenkel === 'L'}
                                value="L"
                                onChange={(e) => setJenkel(e.target.value)}
                            />
                            <Label check>Laki - Laki</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                name="radio1"
                                type="radio"
                                checked={jenkel === 'P'}
                                value="P"
                                onChange={(e) => setJenkel(e.target.value)}
                            />
                            <Label check>Perempuan</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                defaultChecked={beasiswa}
                                onClick={(e) => setBeasiswa(e.target.checked)}
                            />
                            <Label check>Beasiswa</Label>
                        </FormGroup>
                    </FormGroup>

                    <Button onClick={handleSumbitbuttom}>Submit</Button>
                </Form>
            </Container>
        </>
    );
};

export default Inputsiswa;

