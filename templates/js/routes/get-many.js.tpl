const mongoose = require('mongoose'),
    {{title}} = require("../../schema/db/{{title}}");

module.exports = async (req, res, next) => {
    let id = req.params.id; 
    {{title}}.find({}, function (err, items) {
        if (err) next(err);
        res.json(items);
    });
}