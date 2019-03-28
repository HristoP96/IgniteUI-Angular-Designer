const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const srcFiles = {}
const jsonFiles = {};
const dependencies  = require('./dependencies.js');

const app = express()

const srcDir = '../src/';


fs.readdir(srcDir, (err, files) =>{
    files.forEach( file => {
        if(file.includes('.ts') || file.includes('.html')|| file.includes('.scss')){
            console.log(file)
            srcFiles[file] = fs.readFileSync(path.join(__dirname, `${srcDir + file}`), 'utf8')
    }
    })
})

fs.readdir('../', (err, files) =>{
    files.forEach( file => {
        if(file.includes('package.json') || file.includes('angular.json')){
            console.log(file)
            jsonFiles[file] = JSON.parse(fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8'))
    }
    })
})


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions))
  
  app.listen(4205, () => {
    console.log('Server Started')
  })
  
  
  app.route('/').get((req, res) => {
      files = {}
      files['src'] = srcFiles;
      files[''] = jsonFiles
    res.send(files);
  });
  
  app.route('/api/files:name').get((req, res) => {
    const requestedObject = req.params['name']
    res.send({
      name: requestedObject
    })
  });
  
  app.route('/api/files').post((req, res) => {
    res.send(201, req.body);
  })
  
  app.route('/api/files/:name').put((req, res) => {
    res.send(200, req.body)
  })
  
  app.route('/api/files/:name').delete((req, res) => {
    res.sendStatus(204)
  })