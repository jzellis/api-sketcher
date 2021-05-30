const mongoose = require('mongoose'),
Users = require("../schema/Users");

module.exports = async (req, res, next) =>
{
    let body = req.body;
    Users.create(body,function (err, item) {
 
        next(err);
        res.json(item);

    });

}