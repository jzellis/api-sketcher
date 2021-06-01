const express = require('express');
const router = express.Router();
{{#each objs}}
const {{title}}_getMany = require("./{{title}}/getMany");
router.get("{{../settings.apiPath}}{{apiEndpoint}}/",{{title}}_getMany)
const {{title}}_getOne = require("./{{title}}/getOne");
router.get("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_getOne)

const {{title}}_post = require("./{{title}}/post");
router.post("{{../settings.apiPath}}{{apiEndpoint}}",{{title}}_post)
const {{title}}_put = require("./{{title}}/put");
router.put("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_put)
const {{title}}_delete = require("./{{title}}/delete");
router.delete("{{../settings.apiPath}}{{apiEndpoint}}/:id",{{title}}_delete);

{{/each}}

module.exports = router;