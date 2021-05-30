const fs = require('fs'),
path = require('path'),
execSync = require('child_process').execSync,
Handlebars = require('handlebars'),
argv = require('yargs/yargs')(process.argv.slice(2)).argv,
tplDir = argv['template_dir'] || "./templates/",
outputDir = argv['output_dir'] || "./output/",
sourceDir = argv['source_dir'] || "./source",
mongoURL = argv['mongo_url'] || "mongodb://127.0.0.1/app",
appName = argv['app_name'] || "appName",
port = argv['port'] || 80,
appTpl = Handlebars.compile(fs.readFileSync(tplDir + 'app-index.tpl', "utf-8")),
packageTpl = Handlebars.compile(fs.readFileSync(tplDir + 'package.json.tpl', "utf-8")),
schemaTpl = Handlebars.compile(fs.readFileSync(tplDir + 'schema.tpl', "utf-8")),
routesIndexTpl = Handlebars.compile(fs.readFileSync(tplDir + 'routes-index.tpl', "utf-8")),
routeGetTpl = Handlebars.compile(fs.readFileSync(tplDir + 'route_get.tpl', "utf-8")),
routePostTpl = Handlebars.compile(fs.readFileSync(tplDir + 'route_post.tpl', "utf-8")),
routePutTpl = Handlebars.compile(fs.readFileSync(tplDir + 'route_put.tpl', "utf-8")),
routeDeleteTpl = Handlebars.compile(fs.readFileSync(tplDir + 'route_delete.tpl', "utf-8")),
htmlTpl = Handlebars.compile(fs.readFileSync(tplDir + 'html-form.tpl', "utf-8")),
files = fs.readdirSync(sourceDir),
settings = {appName: appName, mongoURL: mongoURL, port: port};
dObjs = [];

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('switch', function(value, options) {
	this.switch_value = value;
	return options.fn(this);
  });
  
  Handlebars.registerHelper('case', function(value, options) {
	if (value == this.switch_value) {
	  return options.fn(this);
	}
  });
  
  Handlebars.registerHelper('default', function(value, options) {
	  return true; ///We can add condition if needs
  });

if (fs.existsSync(outputDir)){

	execSync('rm -r ' + outputDir);
}

generateFiles(outputDir);

// Loads all the data object definitions from files in the source directory
files.forEach( file => {
	console.log(`Parsing ${sourceDir}/${file}`)

	try{
		let f = fs.readFileSync(sourceDir + "/" + file,"utf-8");
		let d = JSON.parse(f);
		dObjs.push(d);

		
	}
	catch(e){
		return console.error(e);
		exit();
	}
});

// Iterates through the list of data objects, creating schema and route and static HTML form files for each one
let RouteIndexOut = routesIndexTpl({objs: dObjs});
try{
	fs.writeFileSync(`${outputDir}src/routes/index.js`,RouteIndexOut);
}catch(err){
	console.error(err)
}
dObjs.forEach(d => {
	
	// Creates the schema
	console.log(`Creating ${d.title} schema...`);
	let schemaOut = schemaTpl(d);
	let getOut = routeGetTpl(d);
	let postOut = routePostTpl(d);
	let putOut = routePutTpl(d);
	let deleteOut = routeDeleteTpl(d);
	let htmlOut = htmlTpl(d);

	try{
		fs.writeFileSync(`${outputDir}src/schema/${d.title}.js`,schemaOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}_get.js`,getOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}_post.js`,postOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}_put.js`,putOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}_delete.js`,deleteOut);
		fs.writeFileSync(`${outputDir}src/static/${d.title}.html`,htmlOut);


	}catch(err){
		console.error(err)
	}

	// Creates the route file

})


function generateFiles(outputDir){
	console.log("Creating app directory structure...")
	fs.mkdirSync(outputDir);
	fs.mkdirSync(outputDir + "src/");
    fs.mkdirSync(outputDir + "src/schema");
    fs.mkdirSync(outputDir + "src/routes");
    fs.mkdirSync(outputDir + "src/static");
	let appOut = appTpl(settings);
	fs.writeFileSync(`${outputDir}src/index.js`,appOut);

	let packageOut = packageTpl(settings);
	fs.writeFileSync(`${outputDir}src/package.json`,packageOut);



}

