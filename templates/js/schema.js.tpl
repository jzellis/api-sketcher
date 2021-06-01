/* Mongoose schema for {{plural}} */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
module.exports = {{title}};