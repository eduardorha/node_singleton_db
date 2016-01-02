# Node Js using singleton pattern connection with MongoDB Native Driver

This repo use [MongoDB Native Driver] (https://mongodb.github.io/node-mongodb-native/contents.html) with singleton pattern and crud base object.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@bitbucket.org:eduardorha/nodejs_singleton_mongodb.g`
2. Install dependencies: `npm install`
3. Change config options to connect with you MongoDB database in `adapters/mongo.js`
5. Start the server: `node app.js`

Once everything is set up, we need create a documents on MongoDB test collection.

### Insert documents on test collection 

Send a `GET`request to `http://localhost:3000/load_data` 

 ### Find all documents on test collection
 
 Send a `GET`request to `http://localhost:3000/find_all`
 
### Update one document (a:10) on test collection
 
 Send a `GET`request to `http://localhost:3000/update_one`
 
### Remove one document (a:1) on test collection
 
 Send a `GET`request to `http://localhost:3000/remove_one`