var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

// Import model
var test = require('./models/test');

app.get( "/", function( req, res ){
    res.send( 'Test singleton MongoDB' );
});

app.get( "/load_data", function( req, res ){
    for (var i = 0; i < 20; i++) {
        test.insertOne({a: i}, function(result){
            console.log("Document: " + result + " inserted!");
        });
    }
    res.send( 'Insert 20 documents on test database' );
});

app.get("/find_all",function( req, res ){
    test.findMany({}, {}, {},function(result){
         result.forEach(function(doc){
             console.log(doc);
         });
    });
   
	res.send( 'Find all documents' );
});

app.get("/remove_one",function( req, res ){
    test.removeOne({ a: 1 }, function( result ){
         console.log( "Document a:1 removed: " + result );
    });
    res.send( 'Remove one document' );
});

app.get("/update_one",function( req, res ){
    test.updateOne({ b: 2 }, { a: 10 }, function( result ){
         console.log( "Document updated: " + result );
    });
    res.send( 'Update one document' );
});

app.listen(3000);