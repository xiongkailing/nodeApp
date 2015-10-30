var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema();
/*Ìí¼Ó×ÔÇ¶Ì×Ê±*/
CommentSchema.add({
    //id: ObjectId,
    createTime: Date,
    comments: [{type:ObjectId,ref:'Comment'}],
    user:{type:ObjectId,ref:'User'}
});
var CommentModel = db.model('Comment', CommentSchema);

module.exports= CommentModel