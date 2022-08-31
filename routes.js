const router = require('express').Router();
const {body} = require('express-validator');
const gizi = require('./controllers/giziController');
const ibu = require('./controllers/ibuController');
const pasien = require('./controllers/anakController');
const training = require('./controllers/trainingController');

const multerImageUpload = require("./config/upload.js");

//MOBILE ROUTES
router.get('/pasien/list', pasien.getPasienByIdIbu)
router.get('/pasien/riwayat', pasien.getPasienRiwayatCheck)


// UNTUK PENGECEKAN GIZI
router.get('/gizi/checkgizi', gizi.checkGizi);
router.post('/gizi/hitung', gizi.hitung);
router.post('/gizi/update', gizi.updateGizi);
router.get('/gizi/result', gizi.resultData);
router.get('/gizi/caridata', gizi.cariData);
router.get('/gizi/riwayat/:id_anak',gizi.getRiwayatCheck);

//UNTUK HANDLE TRAINING DATA
router.get('/training/master', training.generateGizi);
router.get('/training/generate', training.generateTraining);
router.get('/training/logistic', training.generateLogistic);
router.get('/training/tree', training.generateTree);

router.post('/pasien/add', multerImageUpload.single("akta_lahir"), pasien.addpasien);
router.post('/pasien/update', [body('doc_id', "Please provide document id").notEmpty().escape().trim()], pasien.updatepasien);
router.get('/pasien/detail', pasien.detailpasien);
router.post('/pasien/delete', [body('doc_id', "Please provide document id").notEmpty().escape().trim()], pasien.deletepasien);
router.get('/pasien/list', pasien.listpasien);
router.post('/pasien/validasi', pasien.validasipasien);
router.get('/pasien/listvalidasi', pasien.listvalidasi);


router.post('/ibu/add', ibu.addibu);
router.post('/ibu/update', [body('doc_id', "Please provide document id").notEmpty().escape().trim()], ibu.updateibu);
router.get('/ibu/detail', ibu.detailibu);
router.post('/ibu/delete', [body('doc_id', "Please provide document id").notEmpty().escape().trim()], ibu.deleteibu);
router.get('/ibu/list', ibu.listibu);
router.get('/ibu/listanak', ibu.listanak);
router.post('/ibu/validasi', ibu.validasiibu);
router.get('/ibu/listvalidasi', ibu.listvalidasi);
router.get('/ibu/getibudetail/:email', ibu.getIbuByEmail);

module.exports = router;