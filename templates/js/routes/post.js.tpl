const mongoose = require('mongoose'),
    {{title}} = require("../../schema/db/{{title}}");

module.exports = async (req, res, next) => {
    let body = req.body; {{title}}.create(body, function (err, item) {

        next(err);
        res.json(item);

    });

}