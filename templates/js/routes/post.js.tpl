const mongoose = require('mongoose'),
    {{title}} = require("../../schema/{{title}}");

module.exports = async (req, res, next) => {
    let body = req.body; {{title}}.create(body, function (err, item) {

        next(err);
        res.json(item);

    });

}