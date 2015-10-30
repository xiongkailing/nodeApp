var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
    //id: ObjectId,
    title: {type: String, index: true},
    content: {type: String},
    createTime: Date,
    updateTime: {type: Date, default: Date()},
    tags: [{type: ObjectId, ref: 'Tag'}],
    comments: [{type: ObjectId, ref: 'Comment'}],
    user:{type:ObjectId,ref:'User'}
});

var ArticleModel = db.model('Article', ArticleSchema);
module.exports = ArticleModel;