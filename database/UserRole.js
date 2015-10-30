var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RoleSchema = new Schema({
    roleName: {type: String, index: true, unique: true, sparse: true},
    remark: String
});
var UserRoleModel = db.model('UserRole', RoleSchema);
module.exports = UserRoleModel;