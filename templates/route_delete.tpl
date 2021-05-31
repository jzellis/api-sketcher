const mongoose = require('mongoose'),
    {{title}} = require("../schema/{{title}}");

module.exports = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body; {{title}}.findOneAndDelete({
        _id: id
    }, function (err, item) {
        if (err) next(err);
        res.json(item);
    });
}