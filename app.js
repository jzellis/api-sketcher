const fs = require('fs'),
	path = require('path'),
	execSync = require('child_process').execSync,
	Handlebars = require('handlebars'),
	argv = require('yargs/yargs')(process.argv.slice(2)).argv,
	tplDir = argv['template_dir'] || "./templates/",
	outputDir = argv['output_dir'] || "./output/",
	sourceDir = argv['source_dir'] || "./examples/",
	mongoURL = argv['mongo_url'] || "mongodb://127.0.0.1/app",
	appName = argv['app_name'] || "My New App",
	apiPath = argv['api_path'] || "/api/v1/",
	port = argv['port'] || 80,
	templates = {
		js:{
		app: Handlebars.compile(fs.readFileSync(tplDir + 'js/index.js.tpl', "utf-8")),
		package:  Handlebars.compile(fs.readFileSync(tplDir + 'js/package.json.tpl', "utf-8")),
		mongooseSchema:  Handlebars.compile(fs.readFileSync(tplDir + 'js/mongoose-schema.js.tpl', "utf-8")),
		graphQlSchema:  Handlebars.compile(fs.readFileSync(tplDir + 'js/graphql-schema.js.tpl', "utf-8"))
	},
		routes: {
			index:  Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/index.js.tpl', "utf-8")),
			getMany: Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/get-many.js.tpl', "utf-8")),
			getOne: Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/get-one.js.tpl', "utf-8")),

			post:  Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/post.js.tpl', "utf-8")),
			put:  Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/put.js.tpl', "utf-8")),
			delete:  Handlebars.compile(fs.readFileSync(tplDir + 'js/routes/delete.js.tpl', "utf-8")),
		},
		html: {
			index: Handlebars.compile(fs.readFileSync(tplDir + 'html/index.html.tpl', "utf-8")),
			form: Handlebars.compile(fs.readFileSync(tplDir + 'html/object-form.html.tpl', "utf-8"))
		}
	}
settings = {
	appName: appName,
	mongoURL: mongoURL,
	port: port,
	apiPath: apiPath
};
dObjs = [];

let files = fs.readdirSync(sourceDir);
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('switch', function (value, options) {
	this.switch_value = value;
	return options.fn(this);
});

Handlebars.registerHelper('case', function (value, options) {
	if (value == this.switch_value) {
		return options.fn(this);
	}
});

Handlebars.registerHelper('default', function (value, options) {
	return true; ///We can add condition if needs
});

if (fs.existsSync(outputDir)) {

	execSync('rm -r ' + outputDir);
}

generateFiles(outputDir);

// Loads all the data object definitions from files in the source directory
files = files.filter(function (file) {
	return path.extname(file).toLowerCase() === ".json";
});

files.forEach(file => {
	console.log(`Parsing ${sourceDir}${file}`)

	try {
		let f = fs.readFileSync(sourceDir + "/" + file, "utf-8");
		let d = JSON.parse(f);
		dObjs.push(d);


	} catch (e) {
		return console.error(e);
		exit();
	}
});




dObjs.forEach(d => {
	d.graphQLType = d.singular.charAt(0).toUpperCase() + d.singular.slice(1);
	d.properties.forEach(prop =>{
		prop.graphQLType = prop.type === "ObjectId" ? "String" : prop.type; 
	})
	fs.mkdirSync(outputDir + "src/routes/" + d.title);
	// Creates the schema
	console.log(`Creating ${d.title} schema...`);
	let mongooseSchemaOut = templates.js.mongooseSchema(d);
	let getManyOut = templates.routes.getMany(d);
	let getOneOut = templates.routes.getOne(d);
	let postOut = templates.routes.post(d);
	let putOut = templates.routes.put(d);
	let deleteOut = templates.routes.delete(d);
	let htmlOut = templates.html.form(d);

	try {
		console.log(`Creating ${d.title} routes and forms...`)
		fs.writeFileSync(`${outputDir}src/schema/db/${d.title}.js`, mongooseSchemaOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}/getMany.js`, getManyOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}/getOne.js`, getOneOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}/post.js`, postOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}/put.js`, putOut);
		fs.writeFileSync(`${outputDir}src/routes/${d.title}/delete.js`, deleteOut);
		fs.writeFileSync(`${outputDir}static/${d.plural}.html`, htmlOut);


	} catch (err) {
		console.error(err)
	}

	// Creates the route file

})

try {

	// Iterates through the list of data objects, creating schema and route and static HTML form files for each one
let RouteIndexOut = templates.routes.index({
	settings: settings,
	objs: dObjs
});
let HtmlIndexOut = templates.html.index({
	settings: settings,
	objs: dObjs
});

let graphQlSchemaOut = templates.js.graphQlSchema({
	settings: settings,
	objs: dObjs
});
	console.log("Creating routes index file...")
	fs.writeFileSync(`${outputDir}src/routes/index.js`, RouteIndexOut);
	fs.writeFileSync(`${outputDir}static/index.html`, HtmlIndexOut);
	fs.writeFileSync(`${outputDir}src/schema/graphql/schema.js`, graphQlSchemaOut);

} catch (err) {
	console.error(err)
}

function generateFiles(outputDir) {
	console.log("Creating app directory structure...")
	fs.mkdirSync(outputDir);
	fs.mkdirSync(outputDir + "src/");
	fs.mkdirSync(outputDir + "src/schema");
	fs.mkdirSync(outputDir + "src/schema/db");
	fs.mkdirSync(outputDir + "src/schema/graphql");
	fs.mkdirSync(outputDir + "src/routes");
	fs.mkdirSync(outputDir + "static");
	let appOut = templates.js.app(settings);
	console.log("Creating main app file...")
	fs.writeFileSync(`${outputDir}src/index.js`, appOut);

	let packageOut = templates.js.package(settings);
	console.log("Creating package.json file...")

	fs.writeFileSync(`${outputDir}src/package.json`, packageOut);



}