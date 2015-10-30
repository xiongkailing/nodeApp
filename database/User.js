var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    userName: {
        type: String,
        index: true,
        lowercase: true,
        trim: true
    },
    birth: {type: Date, min: new Date('1900-01-01'), max: Date()},
    gender: Boolean,
    password: String,
    email: {
        type: String,
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        index: {unique: true, sparse: true}
    },
    createTime: Date,
    updateTime: {type: Date, default: Date()},
    loginTime: {type: Date},
    role: {type: Schema.Types.Mixed, ref: 'UserRole'},
    articles: [{type: ObjectId, ref: 'Article'}],
    comments: [{type: ObjectId, ref: 'Comment'}],
    remark: String
});

module.exports = db.model('User', UserSchema);