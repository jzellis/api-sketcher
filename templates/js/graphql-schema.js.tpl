const { buildSchema } = require('graphql'),
mongoose = require('mongoose'),
{{#each objs}}
{{title}} = require('../db/{{title}}')
{{/each}}
const schema = buildSchema(`
{{#each objs}}
# {{description}}
type {{graphQLType}} {
    {{#each properties}}
    {{name}}:{{graphQLType}}
    {{/each}}
}

{{/each}}

type Query{

{{#each objs}}
{{plural}}: [{{graphQLType}}]
{{singular}}(id:String): {{graphQLType}}
{{/each}}

}
`);

const root = {
    {{#each objs}}
    {{plural}}: () => {
        return {{title}}.find({})
    },
    {{singular}} : ({id}) => {
        return {{title}}.findOne({_id: id})
    },
    {{/each}}
};

module.exports.schema = schema;
module.exports.root = root;