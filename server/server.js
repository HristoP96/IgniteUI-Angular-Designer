const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
const srcFiles = {}
const jsonFiles = {};
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const dependencies = require('./dependencies.js');

var project = {
  files:{},
  dependencies:{},
  template:{},
  title: {}
}
var mainTs = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/main.ts.template"), 'utf8')
var polyfills = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/polyfills.ts.template"), 'utf8')
var packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, `../package.json`), 'utf8'))

var data;
const app = express()


var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.route('/api/form').post((req, res) => {
  
  var projectFiles = {};
  var projectTitle;
  var projectTemplate;
  var projectDependencies = {};

  var srcFiles = {}
  var appFiles = {};
  var componentFiles = {};
  var allFilesTree = {}
  var angularJson = {}
  //Generate source files
  srcFiles["index.html"] = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/index.html.template"), 'utf8')
  srcFiles["main.ts"] = mainTs
  srcFiles["polyfills.ts"] = polyfills

  //Generate appcomponent files
  appFiles["app.component.html"] = fs.readFileSync(path.join(__dirname, "./app_templates/app.component.html.template"), 'utf8')
  appFiles["app.component.ts"] = fs.readFileSync(path.join(__dirname, "./app_templates/app.component.ts.template"), 'utf8')
  appFiles["app.component.scss"] = fs.readFileSync(path.join(__dirname, "./app_templates/app.component.scss.template"), 'utf8')
  appFiles["app.module.ts"] = fs.readFileSync(path.join(__dirname, "./app_templates/app.module.ts.template"), 'utf8')

  //Initialize stackBlitz project core files
  projectTemplate = 'angular-cli'
  projectTitle = 'Ignite UI for Angular'
  projectDependencies = packageJson['dependencies']

  srcFiles["styles.scss"] = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/styles.scss.template"), 'utf8')
  angularJson = JSON.parse(fs.readFileSync(path.join(__dirname, "./srcFiles_templates/angular.json.template"), 'utf8'))
  projectFiles["angular.json"] = JSON.stringify(angularJson, null, 2)

  // Add source files to the files tree
  allFilesTree['src'] = srcFiles;

  appFiles = replaceFlags(appFiles, req.body)

  //Add app files to the source tree
  allFilesTree['src']['app'] = appFiles;

  componentTsTemplate = fs.readFileSync(path.join(__dirname, "./component_templates/component.ts.template"), 'utf8')

  // Add the data in the date file 
  if (req.body['data']) {
    console.log(req.body['inputs']['data'])
    componentFiles["data.ts"] = `export const ${req.body['data']['name']} = ${JSON.stringify(req.body['inputs']['data'], null, 2)}`
  }

  //Initialize sample component
  componentFiles[`${req.body['selector']}.component.ts`] = replaceComponentFlags(componentTsTemplate, req.body)
  componentFiles[`${req.body['selector']}.component.html`] = buildComponentTemplate(req.body)
  console.log(buildComponentTemplate(req.body))
  componentFiles[`${req.body['selector']}.component.scss`] = ''

  allFilesTree['src']['app'][`${req.body['selector']}`] = componentFiles

  //Apply the files tree in the Stackblitz project
  getFilesPath('src', allFilesTree, 'src', projectFiles)
  project['files'] = projectFiles;
  project['template'] = projectTemplate;
  project['dependencies'] = projectDependencies
  project['title'] - projectTitle
  res.send(project)
})

app.route('/data').post((req, res) => {
  data = fs.readFileSync(path.join(__dirname, '../src/app/'+ req.body["path"]), 'utf8')
})
function getFilesPath(startDir, fileTree, path, projectFiles) {

  if (typeof fileTree[startDir] !== 'object') {
    projectFiles[path] = fileTree[startDir]
    return
  }
  var children = Object.keys(fileTree[startDir])
  children.forEach(child => {
    return getFilesPath(child, fileTree[startDir], `${path}/` + child, projectFiles);
  });
}

function replaceFlags(fileTree, body) {
  var keys = Object.keys(fileTree)
  keys.forEach(key => {
    fileTree[key] = fileTree[key].replace(/{igComponentSelector}/g, body['selector'])
    fileTree[key] = fileTree[key].replace(/{igComponentModule}/g, body['module'])
    fileTree[key] = fileTree[key].replace(/{igComponentName}/g, body['name'])
  })
  return fileTree
}

function replaceComponentFlags(file, body) {
  if (body['data']) {
    file = file.replace(/{igDataFile}/g, `import { ${body['data']['name']} } from "./data"`)
    file = file.replace(/{properties}/g, `public data: any;`)
    file = file.replace(/{propertiesDefinition}/g, `this.data = ${body['data']['name']};`)
  } else {
    file = file.replace(/{igDataFile}/g, '')
    file = file.replace(/{properties}/g, '')
    file = file.replace(/{propertiesDefinition}/g, '')
  }
  file = file.replace(/{igComponentSelector}/g, body['selector'])
  file = file.replace(/{igComponentName}/g, body['name'])
  return file
}

function buildComponentTemplate(body) {
  var inputs = body['inputs'];
  if(body['selector'].includes('grid')){
    return buildGridTemplate(body);
  }

 return ` <${body['selector']} ${Object.keys(inputs).map( key =>{
    if(typeof inputs[key] === 'object'){
      return `[${key}]="${key}"`
    } else if(typeof inputs[key] === 'string'){
      return `[${key}]="'${inputs[key]}'"`
    }
    return `${key}="${inputs[key]}"`}).join(" ")}> 
</${body['selector']}>`
}
 var body = {};
function buildGridTemplate(body){
  var inputs = body['inputs'];
  var baseString = `<${body['selector']} ${Object.keys(inputs).map( key =>{
    if(typeof inputs[key] === 'object'){
      return `[${key}]="${key}"`
    } else if(typeof inputs[key] === 'string'){
      return `[${key}]="'${inputs[key]}'"`
    }
    return `${key}="${inputs[key]}"`}).join(" ")}>`
  switch(body['name']){
    case 'IgxGridComponent':
    return `${baseString}${Object.keys(inputs['data'][0]).map(key => {
        return `\n<igx-column [field]="'${key}'"> </igx-column>\n` 
    }).join("")}</${body['selector']}</${body['selector']}>`;

    case 'IgxTreeGridComponent':

    return `${baseString}${Object.keys(inputs['data'][0]).map(key => {
        if(inputs['childDataKey'] !== key){
          return `\n<igx-column [field]="'${key}'" dataType=${isDate(inputs['data'][0][key])? "'date'":`"${typeof inputs['data'][0][key]}"`}> </igx-column>\n` 
        }
      }).join("")}</${body['selector']}>`

      case 'IgxHierarchicalGridComponent':
      return `${baseString}${Object.keys(inputs['data'][0]).map(key => {
          if(!(typeof inputs['data'][0][key] === 'object' && !(inputs['data'][0][key] instanceof Date))){
            return `\n<igx-column [field]="'${key}'"> </igx-column>\n` 
          }
      }).join('')}${Object.keys(inputs['data'][0]).map(key => {
        if (typeof inputs['data'][0][key] === 'object' && !(inputs['data'][0][key] instanceof Date)) {
          return iterate(inputs['data'][0][key], key);
        }
      }).join('')}\n</${body['selector']}>`;
  }
}

function iterate(data, key){
 var record = data;
   var str = '';
   var child;
    Object.values(record).forEach(obj => {
      str = `\n<igx-row-island autoGenerate="true"  [key]="'${key}'">\n
      ${Object.keys(obj).map(k => {
        if (typeof obj[k] === 'object' && !(obj[k] instanceof Date)) {
           child = `${iterate(obj[k], k)}`;
        }
      }).join('')} \n${ child ? child : ''}\n </igx-row-island>`;
    });
    return str;
  }

function isDate(record) {
  if(typeof(record) === 'string'){
    return !isNaN(Date.parse(record));
  }
  return false
}

app.listen(4205, () => {
  console.log('Server Started')
})
