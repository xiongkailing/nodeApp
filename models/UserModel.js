var md5 = require('md5');
module.exports = function (name, email, gender, pwd, remark, createTime) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.pwd = md5(pwd);
    this.remark=remark;
    if(createTime) {
        this.createTime = createTime;
    }
    function mapFromSchema(){

    }
    function mapToSchema(){

    }
}