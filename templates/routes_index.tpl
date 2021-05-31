const express = require('express');
const router = express.Router();
{{#each objs}}
const {{title}}_get = require("./{{title}}_get");
router.get("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_get)
const {{title}}_post = require("./{{title}}_post");
router.post("{{../settings.apiPath}}{{apiEndpoint}}",{{title}}_post)
const {{title}}_put = require("./{{title}}_put");
router.put("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_put)
const {{title}}_delete = require("./{{title}}_delete");
router.delete("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_delete);
{{/each}}

module.exports = router;