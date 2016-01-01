var mongoDbConnection = require('../adapters/mongo.js');
var BaseCrud = require('../adapters/base_objects/mongo_base.js');
var util = require("util");
var collName = 'test';
// create a new class that will inherit the structure of crud
function Test(collection){
    BaseCrud.call(this, collection);
}
// finally we inherit the base of crud
util.inherits(Test, BaseCrud);

var test = new Test(collName);
module.exports = test;