# Tyburn

**Tyburn** uses data object model definition JSON files to generate a barebones boilerplate Node.js API based on MongoDB/Mongoose and Express, with Mongoose schema and models and simple REST/CRUD API endpoints for each data object model, as well as HTML forms for creating/editing objects that can be chopped up and used as React components or in static HTML files or templates.

It uses Handlebars to render Javascript and HTML to static files. You can very quickly design your basic app data architecture, and Tyburn will turn it into simple working code that you can then add to or edit to your heart's content.

## Installation
Clone or download the repo to your local machine and run `node install` to download all the required library dependencies. That's it.

## Usage

`node app.js --source_dir `**source directory for object JSON files**` --target_dir `**target directory for rendered API source files**`

Once your API is rendered, cd into `target_dir/src` and run `node install`, and then `node index.js`.

## Data Object Model definitions

The definitions for each Data Object Model are stored in individual JSON files. Below is an example:

```
{
	 
	"title": "Users", // The name of the object, capitalized and plural
	"description":"The user object", // The short description of what the object is
	"singular":"user", // lowercase singular of the object name
	"plural":"users", // lowercase plural of the object name 
	"apiEndpoint":"users", // The API endpoint for this object, like /api/**users**
	
    "properties":[ // These are the properties of the data object
		{ 
			
			"name": "username", // The property name
			"type": "String", // The property data type, see [Mongoose Data Types](https://mongoosejs.com/docs/schematypes.html) for valid options.
			"required" : true, // Is the property required when creating a new object
			"maxLength": 64, // If the property is of type String, the maximum length the string can be 
			"minLength": 2, // If the property is of type String, the maximum length the string can be 
            max: 999, // If the property is of type Number, the maximum numeric value the value can be.
            min: 0, // If the property is of type Number, the minimum numeric value the value can be.			
            "ui": { // The UI element generated to create/edit this property, which is rendered into the HTML form for this data object model
				"inputType": "text", // The HTML **input** type for the field. Any valid HTML input type, including select and textarea, are allowed
				"label" : "Username" // The label for the input element
				}
		},
		{
			"name": "email",
			"type" : "String",
			"required" : true,
			"ui" : {
				"inputType": "email",
				"label" : "Email"
			},
			"index": true

		},
		{
			"name": "password",
			"type" : "String",
			"required" : true,
			"ui" : {
				"inputType": "password",
				"label" : "Password"
			}
		},
		{
			"name": "fullName",
			"type" : "String",
			"required" : true,
			"minLength": 1,
			"maxLength" : 256,
			"ui" : {
				"inputType": "text",
				"label" : "Full Name"
			}
		},
		{
			"name": "bio",
			"type" : "String",
			"required" : false,
			"ui" : {
				"inputType": "textarea",
				"label" : "Bio"
			}
		},
		{
			"name": "location",
			"type" : "String",
			"required" : false,
			"ui" : {
				"inputType": "text",
				"label" : "Location"
			}
		},
		{
			"name": "permissions",
			"type" : "String",
			"required" : false,
			"ui" : {
				"inputType": "select",
				"options" : [   //If the input element is a select or radio, the options available for the object, as label and value pairs
						{
						"label" : "Admin",
						"value" : "admin"
						},
{
						"label" : "User",
						"value" : "user"
					}
						],
				"label" : "User Level"
			}
		}	
	]
		}
```

This file will generate a new folder with this structure:

-/src/
 - /static/
   - Users.html         // The HTML form for creating/editing a User
 - /schema
   - Users.js           // The Mongoose Schema/Model definition for the Users object
 - /routes              // API routes
   - index.js           // The main route definitions, with `require()`s for each route method
   - Users_delete.js    // The method for DELETE requests to the Users API endpoint
   - Users_get.js       // The method for DELETE requests to the Users API endpoint
   - Users_post.js      // The method for DELETE requests to the Users API endpoint
   - Users_put.js       // The method for DELETE requests to the Users API endpoint
 - index.js             // The main API Node app
 - package.json         // The package file for the generated app

The GET, PUT and DELETE routes take an `**id**` param, as in **/api/users/12345**. GET retrieves the Users document of that ID; POST (without a specified ID, of course) inserts the body of the POST request as a new User document; PUT updates the document with the specified ID with the body of the post; DELETE removes the record with that ID.

These are extremely simple placeholder functions defined in **/src/routes/<object.singuler>_get.js, _post.js, _put.js** and **_delete.js**. By default they have zero middleware and zero security -- Tyburn literally just creates the files with basic CRUD functions already written for you to get started from.

Also, in your /src/static directory, you will find an HTML file called Users.html, which is an HTML document with Bootstrap and jQuery included via CDN, with a basic generated form that uses Bootstrap structure/class conventions. This form can be broken into subcomponents or included in a template file, for example.

## Status
Tyburn works correctly, but it's still in alpha and has extremely limited options and functionality -- it basically just generates the API from the data object model definition files, with very few options.

## Why "Tyburn"?
Because it creates a [scaffold](https://en.wikipedia.org/wiki/Tyburn#Tyburn_gallows) with just enough rope to hang yourself from.
