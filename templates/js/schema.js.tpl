/* Mongoose schema for {{plural}} */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {factory} = require('fakingoose');

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
const {{singular}}Factory = factory({{title}});
for (i = 0; i < {{generateFixtures}}; i++) {
mock = {{singular}}Factory.generate({});
{{title}}.create(mock);
}
{{/if}}
module.exports = {{title}};