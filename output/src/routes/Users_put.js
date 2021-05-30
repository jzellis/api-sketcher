const mongoose = require('mongoose'),
Users = require("../schema/Users");

module.exports = async (req, res, next) =>
{
    let id = req.params.id;
    let body = req.body;
    Users.findOneAndUpdate({_id: id}, req.body, {new: true, upsert: true},function(err, item){
        if(err) next(err);
        res.json(item);
    });
}