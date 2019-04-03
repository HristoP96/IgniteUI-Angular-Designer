const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path');

const srcFiles = {}
const jsonFiles = {};
const dependencies = require('./dependencies.js');

const app = express()

const srcDir = '../src/';


fs.readdir(srcDir, (err, files) => {
  files.forEach(file => {
    if (file.includes('.ts') || file.includes('.html') || file.includes('.scss')) {
      srcFiles[file] = fs.readFileSync(path.join(__dirname, `${srcDir + file}`), 'utf8')
    }
  })
})

fs.readdir('../', (err, files) => {
  files.forEach(file => {
    if (file.includes('package.json') || file.includes('angular.json')) {
      jsonFiles[file] = JSON.parse(fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8'))
    }
  })
})


var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.listen(4205, () => {
  console.log('Server Started')
})


app.route('/api/file').get((req, res) => {
  res.send(files);
});

app.route('/api/form').post((req, res) => {
  var files = {}
  var project = {
    files: {},
    title: {},
    template: {},
    dependencies: {}
  }
  files['src'] = srcFiles;
  project['files']["angular.json"] = JSON.stringify(jsonFiles['angular.json'], null, 2)
  var paths = Object.keys(files)
  paths.forEach(path => {
    var names = Object.keys(files[path]);
    var values = Object.values(files[path]);
    for (let index = 0; index < values.length; index++) {
      project["files"][`${path}/${names[index]}`] = values[index];
    }

  });

  project['template'] = 'angular-cli'
  project['title'] = 'test'
  project['dependencies'] = jsonFiles['package.json']['dependencies']
  res.send(project)
})