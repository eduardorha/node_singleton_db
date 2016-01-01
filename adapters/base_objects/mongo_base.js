// Import connection object
var mongoAdapter = require('../mongo');
// Current version. 1.0
// CRUD Functions
// --------------------
// query: Optional. Specifies selection criteria using query operators. To return all documents in a collection,  pass an empty document ({}).
// projection: Optional. Specifies the fields to return using projection operators. To return all fields in the matching document, omit this parameter or pass an empty document ({}).
// options: Defines extra logic (sorting options, paging, skip,  etc.)
// callback: Your callback function.
// This function return all documents on the collection
function Crud(colName){
    // findMany Function
    // --------------------
    // query: Optional. Specifies selection criteria using query operators. To return all documents in a collection,  pass an empty document ({}).
    // projection: Optional. Specifies the fields to return using projection operators. To return all fields in the matching document, omit this parameter or pass an empty document ({}).
    // options: Defines extra logic (sorting options, paging, skip,  etc.)
    // callback: Your callback function.
    // This function return all documents into an array of all matching records
    this.findMany = function( query, projection, options, callback ) {
            mongoAdapter.getConnection(function(err,db) { 
                if(err) throw new Error(err);
                var collection = db.collection(colName);
                collection.find( query, projection, options ).toArray( function(err, results) {
                    if(err) throw new Error(err);
                    // close db connection
                    mongoAdapter.close(db);
                    callback(results);
                });
            });
    };
    // findOne Function
    // --------------------
    // query: Optional. Specifies selection criteria using query operators. To return all documents in a collection,  pass an empty document ({}).
    // projection: Optional. Specifies the fields to return using projection operators. To return all fields in the matching document, omit this parameter or pass an empty document ({}).
    // callback: Your callback function.
    // This function return one document 
    this.findOne = function( query, projection, callback ) {
        mongoAdapter.getConnection(function(err,db) {
            if(err) throw new Error(err);
            var collection = db.collection(colName);
            collection.findOne(query, projection, function(error, results) {
                if(err) throw new Error(err);
                // close db connection
                mongoAdapter.close(db);
                callback(results);
            }); 
        });
     };
    // updateOne Function
    // --------------------
    // fields: Document with fields that will be updated
    // query:  Specifies selection criteria using query operators. It can not be null or undefined
    // callback: Your callback function.
    // This function return result document updated
     this.updateOne = function( fields, query, callback ) {
        if( query === undefined || query === null ) throw new Error("The criteria can not be null or undefined");
        mongoAdapter.getConnection(function(err,db) {
            if(err) throw new Error(err);
            var collection = db.collection(colName);
            collection.update( query, { $set : fields  }, {upsert: false, multi: false, w: 1}, function(err, result) {
                if(err) throw new Error(err);
                // close db connection
                mongoAdapter.close(db);
                callback(result);
            });
        });
      };
    // removeOne Function
    // --------------------
    // This function remove one document
    // query:  Specifies remove criteria using query operators. It can not be null or undefined
    // callback: Your callback function.
    // This function return result the document removed
      this.removeOne = function( query, callback ) {
        if( query === undefined || query === null ) throw new Error("The criteria can not be null or undefined");
        mongoAdapter.getConnection(function(err,db) {
            if(err) throw new Error(err);
            var collection = db.collection(colName);
            collection.remove( query, { single: true,  w: 1 }, function(err, result) {
                if(err) throw new Error(err);
                // close db connection
                mongoAdapter.close(db);
                callback(result);
            });
        });
      };
    // insertOne Function
    // --------------------
    // This function remove one document
    // query:  Specifies remove criteria using query operators. It can not be null or undefined
    // callback: Your callback function.
    // This function return result the document removed
      this.insertOne = function( document, callback ) {
        if( document === undefined || document === null ) throw new Error("The document can not be null or undefined");
        mongoAdapter.getConnection(function(err,db) {
            if(err) throw new Error(err);
            var collection = db.collection(colName);
            collection.insert( document, { w: 1 }, function(err, result) {
                if(err) throw new Error(err);
                // close db connection
                mongoAdapter.close(db);
                callback(result);
            });
        });
      };
}

module.exports = Crud;