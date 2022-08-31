const { validationResult } = require('express-validator');
const conn = require('../dbConnection');
//const pasien = conn.firestore().collection('pasien');

const addpasien = async (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (!req.file) {

        return res.status(422).json({

            status: res.status,

            msg: "Gambar harus di upload",

        });

    }

    const akta_lahir = req.protocol + "://" + req.get("host") + "/uploads" + "/" + req.file.filename;

    const { id_ibu, nama_anak, jenis_kelamin, tgl_lahir} = req.body;
    const insert = `insert into anak (nama_anak, id_ibu, jenis_kelamin, tgl_lahir, akta_lahir) values 
    ('${nama_anak}', '${id_ibu}', '${jenis_kelamin}', '${tgl_lahir}', '${akta_lahir}')`;
    conn.query(insert, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'add data anak berhasil dengan code ' + results.insertId })
        }
    });
}

const updatepasien = async (req, res) => {
    const { doc_id, id_ibu, nama_anak, jenis_kelamin, tgl_lahir } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const updated = `update pasien set id_ibu = '${id_ibu}', nama_anak = '${nama_anak}', jenis_kelamin = '${jenis_kelamin}' , tanggal_lahir = '${tgl_lahir}' where doc_id = ${doc_id}'`;
    conn.query(updated, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data update anak berhasil ' + results.affectedRows })
        }
    })
}

const detailpasien = async (req, res) => {
    const doc_id = req.query.doc_id;
    if (doc_id) {
        const select = `select * from anak where id = ${doc_id}`;
        conn.query(select, (err, results) => {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                res.status(201).json({ message: 'data result ', data: results })
            }
        })
    } else {
        res.status(400).json({ message: "param not found", data: {} });
    }
}

const deletepasien = async (req, res) => {
    const doc_id = req.body.doc_id
    if (doc_id) {
        const deleted = `delete from anak where id = ${doc_id}`;
        conn.query(deleted, (err, results) => {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                res.status(201).json({ message: 'data update anak berhasil dihapus' + results.affectedRows })
            }
        })
    } else {
        res.status(400).json({ message: 'data pasien not found' });
    }
}

const listpasien = async (req, res) => {
    const select = `select * from anak`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message, data: {} })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const validasipasien = async (req, res) => {
    const { doc_id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const updated = `update anak set validasi = 1 where id = '${doc_id}'`;
    conn.query(updated, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data update anak berhasil ' + results.affectedRows })
        }
    })
}

const listvalidasi = async (req, res) => {
    const select = `select * from anak where validasi is null`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message, data: {} })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const getPasienByIdIbu = async (req, res) => {
    const emailIbu = req.query.email_ibu
    const sql = `select * from ibu join anak on ibu.id = anak.id_ibu where ibu.email="${emailIbu}"`
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'berhasil memanggil daftar pasien ', data: results })
        }
    })
}

const getPasienRiwayatCheck = async (req, res) => {
    const { email_ibu, id_anak } = req.query
    console.log("ibu", email_ibu)
    console.log("anak", id_anak)
    const sql = `SELECT anak.nama_anak, pengecekan.tanggal_check, pengecekan.usia, pengecekan.berat_badan, pengecekan.tinggi_badan, pengecekan.status_gizi, pengecekan.indeks_massa, pengecekan.usia from ibu join anak on ibu.id = anak.id_ibu join pengecekan on anak.id = pengecekan.id_anak WHERE ibu.email = "${email_ibu}" and anak.id= "${id_anak}";`
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'berhasil memanggil riwayat pengecekan', data: results })
        }
    })
}

module.exports = { addpasien, updatepasien, detailpasien, deletepasien, listpasien, validasipasien, listvalidasi, getPasienByIdIbu, getPasienRiwayatCheck };