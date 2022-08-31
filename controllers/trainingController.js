const fs = require("fs");
var C45 = require('c4.5');
const {parse} = require("csv-parse");
const csv = require("csv");
const conn = require('../dbConnection');
var learningjs = require('../js/learningjs');
var data_util = require("../js/data_util.js");

//UNTUK MENGHITUNG HASIL GIZI 
async function getdatapasien () {
    var res_array = [];
    const select = `SELECT jenis_kelamin, usia, berat_badan FROM pasien a inner join gizi_pasien b on a.id = b.pasien_id group by pasien_id order by tanggal_check desc `;
    conn.query(select, (err, results) => {
        if(err){
            res_array = [];
            console.log(err.message);
        }else{
            for (const dataklas of results) {
                var datapush = [dataklas.jenis_kelamin, dataklas.usia, dataklas.berat_badan];
                res_array.push(datapush);
            }            
        }
    })
    
    return res_array;
}

async function writeToFirestore(records){
    await gizi.add({ subdiv : records.SUBDIVISION, year: records.YEAR, jan : records.JAN})
    .then(() => {
        console.log('input data berhasil'); 
    }).catch((err) => {
        console.log(err); 
    })
}

const generateGizi = async(req, res) => {
    fs.createReadStream("rainfall.csv").pipe(parse({columns: true }))
    .on("data", function (row) {
        writeToFirestore(row)
    })
    .on("end", function () {
        console.log("finished");
        res.status(201).json({ message:'input data klasifikasi berhasil' }); 
    })
    .on("error", function (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message }); 

    });
}

const generateTraining = async(req, res) => {
    var testData = await getdatapasien();
    var res_array = [];
    fs.readFile('data.csv', (err, data)=>{
        if(err){
            console.error(err)
            res.status(400).json({message: err.message});
        }

        csv.parse(data, (err, data)=>{
            if (err) {
                console.error(err);
                res.status(400).json({message: err.message});
            }

            var headers = data[0];
            var features = headers.slice(1,-1); // ["attr1", "attr2", "attr3"]
            var featureTypes = ['category','number','category'];
            var trainingData = data.slice(1).map(function(d) {
                return d.slice(1);
            })
            var target = headers[headers.length-1]; // "class"
            var c45 = C45();

            c45.train({
                data: trainingData,
                target: target,
                features: features,
                featureTypes: featureTypes
            }, function(error, model) {
            if (error) {
                console.error(error);
                return false;
            }
            
            testData.forEach((elm, index) => {
                    var datapush = [elm[0], elm[1], elm[2], model.classify(elm[index])==='Gizi Buruk'];
                    res_array.push(datapush);
                }); 
            })
            // fs.writeFileSync('result.json', c45.toJSON())
            res.status(200).json({message: 'berhasil', data: res_array })
        })
    });
}

const generateLogistic = async(req, res) => {
    data_util.loadRealFile('data.csv', (D) => {
        //normalize data
        data_util.normalize(D.data, D.nfeatures); 
        //logistic regression. following params are optional
        D.optimizer = 'sgd'; //default choice. other choice is 'gd'
        D.learning_rate = 0.005;
        D.l2_weight = 0.000001;
        D.iterations = 1000; //increase number of iterations for better performance

        new learningjs.logistic().train(D, function(model, err){
            if(err) {
                console.log(err);
                res.status(400).json({ message : 'failed', data: err});
            } else {
                model.calcAccuracy(D.data, D.targets, function(acc, correct, total) {
                    console.log('data training: got '+correct +' correct out of '+total+' examples. accuracy:'+(acc*100.0).toFixed(2)+'%');
                });
                data_util.loadRealFile('data_testing.csv', function(T) {
                    model.calcAccuracy(T.data, T.targets, function(accs, corrects, totals){
                        console.log('data test: got '+corrects +' correct out of '+totals+' examples. accuracy:'+(accs*100.0).toFixed(2)+'%');                     
                    });
                });

                res.status(200).json({ message : 'berhasil', data: '' });
            }
        });
      }); 
}

const generateTree = async(req, res) => {
    data_util.loadTextFile('data.csv', function(D) {
        var start = process.hrtime();
        new learningjs.tree().train(D, function(model, err){
          if(err) {
            console.log(err);
            res.status(400).json({ message : 'failed', data: err});
          } else {
            var elapsed = process.hrtime(start)[1] / 1000000;
            console.log('training took ' + process.hrtime(start)[0] + " s, " + elapsed.toFixed(2) + " ms.");
            model.calcAccuracy(D.data, D.targets, function(acc, correct, total){
              console.log('training: got '+correct +' correct out of '+total+' examples. accuracy:'+(acc*100.0).toFixed(2)+'%');
            });

            data_util.loadTextFile('data_testing.csv', function(T) {
              model.calcAccuracy(T.data, T.targets, function(acc, correct, total){
                console.log('test: got '+correct +' correct out of '+total+' examples. accuracy:'+(acc*100.0).toFixed(2)+'%');
              });
            });

            res.status(200).json({ message : 'berhasil', data: '' });
          }
        });
      }); 
}

module.exports = {generateGizi, generateTraining, generateLogistic, generateTree};
