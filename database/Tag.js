var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    name: {type: String, index: true, unique: true, sparse: true}
});

var TagModel = db.model('Tag', TagSchema);
module.exports = TagModel;