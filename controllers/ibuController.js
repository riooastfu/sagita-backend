const { validationResult } = require('express-validator');
const md5 = require('md5');
const conn = require('../dbConnection');

const addibu = async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { nama_ibu, email, password } = req.body;
    var encrypt_password = md5(password)
    const insert = `insert into ibu (nama_ibu, email, password) values 
    ('${nama_ibu}', '${email}', '${encrypt_password}')`;
    conn.query(insert, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'add data ibu berhasil dengan code ' + results.insertId })
        }
    });
}

const updateibu = async (req, res) => {
    const { doc_id, nama_ibu, email, password } = req.body;
    var encrypt_password = md5(password)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const updated = `update ibu set nama_ibu = '${nama_ibu}', email = '${email}' , password = '${encrypt_password}' where id = ${doc_id}'`;
    conn.query(updated, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data update ibu berhasil ' + results.affectedRows })
        }
    })
}

const detailibu = async (req, res) => {
    const doc_id = req.query.doc_id;
    if (doc_id) {
        const select = `select * from ibu where id = ${doc_id}`;
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

const deleteibu = async (req, res) => {
    const doc_id = req.body.doc_id
    if (doc_id) {
        const deleted = `delete from ibu where id = ${doc_id}`;
        conn.query(deleted, (err, results) => {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                const hapus_anak = `delete from anak where id_ibu = ${doc_id}`;
                conn.query(hapus_anak, (err, hasil) => {
                    if (err) {
                        res.status(400).json({ message: 'hapus_anak::' + err.message })
                    }
                });
                res.status(201).json({ message: 'data ibu berhasil dihapus' + results.affectedRows })
            }
        })
    } else {
        res.status(400).json({ message: 'data ibu not found' });
    }
}

const listibu = async (req, res) => {
    const select = `select * from ibu`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message, data: {} })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const validasiibu = async (req, res) => {
    const { doc_id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const updated = `update ibu set validasi = 1 where id = '${doc_id}'`;
    conn.query(updated, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data update ibu berhasil ' + results.affectedRows })
        }
    })
}

const listvalidasi = async (req, res) => {
    const select = `select a.id, nama_anak, id_ibu, nama_ibu, tgl_lahir, jenis_kelamin, akta_lahir, a.validasi as valid_anak from anak a inner join ibu b on a.id_ibu = b.id where (a.validasi is null)`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message, data: {} })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const listanak = async (req, res) => {
    const doc_id = req.query.doc_id
    if (doc_id) {
        const get_anak = `select a.id, nama_anak, id_ibu, nama_ibu, tgl_lahir, jenis_kelamin, a.validasi as valid_anak from anak a inner join ibu b on a.id_ibu = b.id where id_ibu = ${doc_id}`;
        conn.query(get_anak, (err, results) => {
            if (err) {
                res.status(400).json({ message: err.message, data: {} })
            } else {
                res.status(201).json({ message: 'data result ', data: results })
            }
        })
    } else {
        res.status(400).json({ message: 'data ibu not found' });
    }
}

const getIbuByEmail = async(req, res) => {
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const {email} = req.params;
    const sql = `select * FROM ibu WHERE email="${email}"`;
    conn.query(sql, (err, results) => {
        if(err){
            res.status(400).json({ message: err.message })
        }else{
            res.status(201).json({ message: 'berhasil memanggil detail ibu',data:results[0], test:"Percobaan"})
        } 
    });
}

module.exports = { addibu, updateibu, detailibu, deleteibu, listibu, validasiibu, listvalidasi, listanak, getIbuByEmail };