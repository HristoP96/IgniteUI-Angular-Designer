const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
const srcFiles = {}
const jsonFiles = {};
var appFiles = {};
var componentFiles = {};
const dependencies = require('./dependencies.js');

appFiles["app.component.html"] = fs.readFileSync(path.join(__dirname, "./templates/app.component.html.template"), 'utf8')
appFiles["app.component.ts"] = fs.readFileSync(path.join(__dirname, "./templates/app.component.ts.template"), 'utf8')
appFiles["app.component.scss"] = fs.readFileSync(path.join(__dirname, "./templates/app.component.scss.template"), 'utf8')
appFiles["app.module.ts"] = fs.readFileSync(path.join(__dirname, "./templates/app.module.ts.template"), 'utf8')

componentTsTemplate = fs.readFileSync(path.join(__dirname, "./component_templates/component.ts.template"), 'utf8')

const app = express()
const srcDir = '../src/';

var project = {
  files: {},
  title: {},
  template: {},
  dependencies: {}
}

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
 // res.send(files);
});

app.route('/api/form').post((req, res) => {
  const template = req.body;
  console.log(template)

  project['template'] = 'angular-cli'
  project['title'] = 'test'
  project['dependencies'] = jsonFiles['package.json']['dependencies']
  project['files']["angular.json"] = JSON.stringify(jsonFiles['angular.json'], null, 2)

  var files = {}
  files['src'] = srcFiles;

  appFiles = replaceFlags(appFiles, req.body)
  files['src']['app'] = appFiles;

  if(req.body['data']){
    componentFiles["data.ts"] = `export const ${req.body['data']['name']} = ${JSON.stringify(req.body['data']['value'], null, 2)}`
  }

  componentFiles[`${req.body['selector']}.component.ts`] = replaceComponentFlags(componentTsTemplate, req.body)
  componentFiles[`${req.body['selector']}.component.html`] = req.body['template']
  componentFiles[`${req.body['selector']}.component.scss`] = ''
  files['src']['app'][`${req.body['selector']}`] = componentFiles ;
  getFilePath('src', files, 'src')
  res.send(project)
})
function getFilePath(startDir, fileTree, path){

  if(typeof fileTree[startDir] !== 'object'){
     path;
     project['files'][path] = fileTree[startDir]
    return
  }  
  var children = Object.keys(fileTree[startDir])
  children.forEach(child =>  {
     return getFilePath(child, fileTree[startDir], `${path}/` + child);
  });
}

function replaceFlags(fileTree, body){
  var keys = Object.keys(fileTree)
  keys.forEach(key =>{
    fileTree[key] = fileTree[key].replace(/{igComponentSelector}/g, body['selector'])
    fileTree[key] = fileTree[key].replace(/{igComponentModule}/g, body['module'])
    fileTree[key] = fileTree[key].replace(/{igComponentName}/g, body['name'])
  })
  return fileTree 
}

function replaceComponentFlags(file, body){
  if(body['data']){
    file = file.replace(/{igDataFile}/g, `import { ${body['data']['name']} } from "./data.ts"`)
    file = file.replace(/{properties}/g, `public data:any;`)
    file = file.replace(/{propertiesDefinition}/g, `this.data = ${body['data']['name']};`)
  } else {
    file = file.replace(/{igDataFile}/g,'')
    file = file.replace(/{properties}/g, '')
    file = file.replace(/{propertiesDefinition}/g,'')
  }
    file = file.replace(/{igComponentSelector}/g, body['selector'])
    file = file.replace(/{igComponentName}/g, body['name'])
  return file 
}
