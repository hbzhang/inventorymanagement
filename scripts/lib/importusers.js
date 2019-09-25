/**
 * Created by hbzhang on 8/18/16.
 */

/*var csv = require("fast-csv");

csv.fromPath('./test.csv',{headers: true})
    .on("data", function(data){
        var details = new Details;
        details=data;
        details.save(function (saveErr, savedetail) {
            if (saveErr) {
                console.log(saveErr)
            }
        });
    })
    .on("end", function(){
        console.log("done");
    });
*/

var fs= require('fs');
var csv = require('fast-csv');
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/insertDB';
var MongoClient = mongodb.MongoClient;

var data;

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        var collection = db.collection('airports');
        readData=fs.createReadStream('x.csv').pipe(csv())
            .on('data',function(data){
                collection.insert({'data': data});
            })
            .on('end',function(data){
                console.log('Read finished');
            })

    }

