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
  files: {},
  title: {},
  template: {},
  dependencies: {}
}

var mainTs = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/main.ts.template"), 'utf8')
var polyfills = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/polyfills.ts.template"), 'utf8')
var packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, `../package.json`), 'utf8'))
const app = express()

// fs.readdir(srcDir, (err, files) => {
//   files.forEach(file => {
//     if (file.includes('polyfills') || file.includes('.html') || file.includes('.scss')) {
//       srcFiles[file] = fs.readFileSync(path.join(__dirname, `${srcDir + file}`), 'utf8')
//     }
//   })
// })

// fs.readdir('../', (err, files) => {
//   files.forEach(file => {
//     if (file.includes('package.json') ) {
//       jsonFiles["package.json"] = JSON.parse(fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8'))
//     }else if( file.includes('angular.json') ){
//       jsonFiles["angular.json"] = JSON.parse(fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8'))
//     }
//   })
// })

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
  var srcFiles = {}
  var appFiles = {};
  var componentFiles = {};
  var allFilesTree = {}
  var angularJson ={}
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
  project['template'] = 'angular-cli'
  project['title'] = 'Ignite UI for Angular'
  project['dependencies'] = packageJson['dependencies']

  if(req.body['style'] === 0){
    srcFiles["styles.scss"] = fs.readFileSync(path.join(__dirname, "./srcFiles_templates/styles.scss.template"), 'utf8')
      angularJson = JSON.parse(fs.readFileSync(path.join(__dirname, "./srcFiles_templates/angular.json.template"), 'utf8')) 
    project['files']["angular.json"] = JSON.stringify(angularJson, null, 2)
  }else{
    // srcFiles["styles.css"] = postcss([autoprefixer({browsers: ["last 5 versions", "> 3%"], grid: true})])
    //                         .process(fs.readFileSync(path.join(__dirname, "../srcFiles_templates/styles.scss.template"), 'utf8')).css.toString()
    // project['files']["angular.json"] = JSON.stringify(fs.readFileSync(path.join(__dirname, "./css_support_templates/angular-css-support.json.template")), null, 2)
  }
  
  // Add source files to the files tree
  allFilesTree['src'] = srcFiles;

  appFiles = replaceFlags(appFiles, req.body)

  //Add app files to the source tree
  allFilesTree['src']['app'] = appFiles;

  componentTsTemplate = fs.readFileSync(path.join(__dirname, "./component_templates/component.ts.template"), 'utf8')

  // Add the data in the date file 
  if(req.body['data']){
    componentFiles["data.ts"] = `export const ${req.body['data']['name']} = ${JSON.stringify(req.body['data']['value'], null, 2)}`
  }

  //Initialize sample component
  componentFiles[`${req.body['selector']}.component.ts`] = replaceComponentFlags(componentTsTemplate, req.body)
  componentFiles[`${req.body['selector']}.component.html`] = req.body['template']
  componentFiles[`${req.body['selector']}.component.scss`] = ''

  allFilesTree['src']['app'][`${req.body['selector']}`] = componentFiles

  //Apply the files tree in the Stackblitz project
  getFilesPath('src', allFilesTree, 'src')

  res.send(project)
})

function getFilesPath(startDir, fileTree, path){

  if(typeof fileTree[startDir] !== 'object'){
     project['files'][path] = fileTree[startDir]
    return
  }  
  var children = Object.keys(fileTree[startDir])
  children.forEach(child =>  {
     return getFilesPath(child, fileTree[startDir], `${path}/` + child);
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
    file = file.replace(/{igDataFile}/g, `import { ${body['data']['name']} } from "./data"`)
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

app.listen(4205, () => {
  console.log('Server Started')
})
