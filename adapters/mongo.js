var MongoClient = require('mongodb').MongoClient;
var connection = null;
// config
var dbMongo = process.env.MONGODB || 'test_singleton';
var dbPort = process.env.MONGOPORT || '27017';
var dbHostname = process.env.MONGOPORT || 'localhost';
var mdbUrl = process.env.MONGOURL || 'mongodb://' + dbHostname + ':' + dbPort + '/' + dbMongo;
// Export connection object
module.exports = {
    getConnection : function(callback) {
        if (connection) {
            callback(null, connection);
        } else {
            MongoClient.connect(mdbUrl,function(err,db){
                if(err)
                    console.log("Connection error: " + err);
                else
                {
                    connection = db;
                    console.log("Successful connection!");
                }
                callback(err,connection);
                return;
            });
        }
    },
    close: function(db){
        connection = null;
        db.close();
    }
} 
