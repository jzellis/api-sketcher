const mongoose = require('mongoose'),
Users = require("../schema/Users");

module.exports = async (req, res, next) =>
{
    let id = req.params.id;
    Users.findOne({_id: id}, function(err, item){
        if(err) next(err);
        res.json(item);
    });
}