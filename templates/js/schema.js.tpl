/* Mongoose schema for {{plural}} */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    {factory} = require('fakingoose'),
    faker = require('faker');

var {{singular}}Schema = new Schema({

    {{#each properties}}
    {{name}}: {
        type: {{type}},{{#if required}}
        required: {{required}},{{/if}}{{#if default}}
        default: {{default}},{{/if}}{{#if minLength}}
        minLength: {{minLength}},{{/if}}{{#if maxLength}}
        maxLength: {{maxLength}},{{/if}}{{#if min}}
        min: {{min}},{{/if}}{{#if max}}
        max: {{max}},{{/if}}
    },
    {{/each}}

},{timestamps: {dateAdded: 'dateAdded',dateModified: 'dateModified'}});


const {{title}} = mongoose.model("{{title}}", {{singular}}Schema);

{{#if generateFixtures}}
{{title}}.remove({});
for (i = 0; i < {{generateFixtures}}; i++) {
options = {
    {{#each properties}}
    {{#if fixture}}
    {{name}} : { 
        value: (object) => { 
            return {{{fixture}}} 
            }
        },
    {{/if}}
    {{/each}}
};
{{singular}}Factory = factory({{title}}, options);



mock = {{singular}}Factory.generate({});
{{title}}.create(mock);
}
{{/if}}
module.exports = {{title}};