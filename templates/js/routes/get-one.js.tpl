const mongoose = require('mongoose'),
    {{title}} = require("../../schema/db/{{title}}");

module.exports = async (req, res, next) => {
    let id = req.params.id; {{title}}.findOne({
        _id: id
    }, function (err, item) {
        if (err) next(err);
        res.json(item);
    });
}