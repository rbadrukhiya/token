const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema  ({
    name:({
        type:String
    }),
    email:({
        type:String
    })
})
const MyModel = mongoose.model('demo2', user);
module.exports = MyModel;
