const express = require('express');
const router = express.Router();
const Users_get = require("./Users_get");
router.get("/api/users/:id",Users_get)
const Users_post = require("./Users_post");
router.post("/api/users",Users_post)
const Users_put = require("./Users_put");
router.put("/api/users/:id",Users_put)
const Users_delete = require("./Users_delete");
router.delete("/api/users/:id",Users_delete);

module.exports = router;