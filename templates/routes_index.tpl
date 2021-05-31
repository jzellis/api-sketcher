const express = require('express');
const router = express.Router();
{{#each objs}}
const {{title}}_get = require("./{{title}}_get");
router.get("/api/{{apiEndpoint}}/:id",{{title}}_get)
const {{title}}_post = require("./{{title}}_post");
router.post("/api/{{apiEndpoint}}",{{title}}_post)
const {{title}}_put = require("./{{title}}_put");
router.put("/api/{{apiEndpoint}}/:id",{{title}}_put)
const {{title}}_delete = require("./{{title}}_delete");
router.delete("/api/{{apiEndpoint}}/:id",{{title}}_delete);
{{/each}}

module.exports = router;