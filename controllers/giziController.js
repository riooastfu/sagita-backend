const { validationResult } = require('express-validator');
const conn = require('../dbConnection');

function capFirstLetterInSentence(sentence) {
    let words = sentence.split(" ").map(word => {
        return word[0].toUpperCase() + word.slice(1);
    })
    return words.join(" ");
}

const checkGizi = async (req, res) => {
    const doc_name = (req.query.name) ? req.query.name : '';
    // let docName = capFirstLetterInSentence(doc_name);
    const select = `SELECT a.id, nama_anak, nama_ibu, tgl_lahir, jenis_kelamin, a.validasi AS validasi_anak, email FROM anak a INNER JOIN ibu b ON a.id_ibu = b.id WHERE email LIKE '%${doc_name}%'`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const hitung = async (req, res) => {
    const tinggi = req.query.tinggi;
    const berat = req.query.berat;
    if (tinggi || berat) {
        var imt = (berat / tinggi) * tinggi;
        res.status(201).json({ message: 'data result', data: { imt: imt } })
    } else {
        res.status(400).json({ message: "disabled parameter" })
    }
}

const resultData = async (req, res) => {
    const select = `select count(id) as total,
    CAST((count(case when status = 'Beresiko Gizi Lebih' then 1 end)/count(id)*100) as int) as 'beresiko',
    CAST((count(case when status = 'Gizi Buruk' then 1 end)/count(id)*100) as int) as 'buruk',
    CAST((count(case when status = 'Gizi Kurang' then 1 end)/count(id)*100) as int) as 'kurang',
    CAST( (count(case when status = 'Gizi Lebih' then 1 end)/count(id)*100) as int) as 'lebih',
    CAST((count(case when status = 'Normal' then 1 end)/count(id)*100)  as int) as 'normal',
    CAST((count(case when status = 'Obesitas' then 1 end)/count(id)*100)  as int) as 'obesitas'
    from data_testing dt;`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const updateGizi = async (req, res) => {
    const { pasien_id, berat_badan, tinggi_badan, usia, tanggal_check, imt, status_gizi } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const insert = `insert into pengecekan (id_anak, berat_badan, tinggi_badan, usia, tanggal_check, indeks_massa, status_gizi) values 
    ('${pasien_id}','${berat_badan}', '${tinggi_badan}', '${usia}', '${tanggal_check}', '${imt}', '${status_gizi}')`;
    conn.query(insert, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'add data gizi pasien berhasil dengan code ' + results.insertId })
        }
    })
}

const cariData = async (req, res) => {
    const doc_name = (req.query.id) ? req.query.id : '';
    // let docName = capFirstLetterInSentence(doc_name);
    const select = `select a.id, nama_anak, nama_ibu, tgl_lahir, jenis_kelamin from anak a inner join ibu b on a.id_ibu = b.id where a.id = '${doc_name}'`;
    conn.query(select, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'data result ', data: results })
        }
    })
}

const getRiwayatCheck = async (req, res) => {
    const { id_anak } = req.params
    const sql = `SELECT anak.nama_anak, id_anak, pengecekan.tanggal_check, pengecekan.usia, pengecekan.berat_badan, pengecekan.tinggi_badan, pengecekan.status_gizi, pengecekan.indeks_massa, pengecekan.id from anak inner join pengecekan on anak.id = pengecekan.id_anak WHERE anak.id= "${id_anak}";`
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            res.status(201).json({ message: 'berhasil memanggil riwayat pengecekan', data: results })
        }
    })
}
module.exports = { checkGizi, hitung, updateGizi, resultData, cariData, getRiwayatCheck };