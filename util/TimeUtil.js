function getNow(){
    return parseInt(Date.now() / 1000);//返回1970年到当前的秒数
}
module.exports.getNow = getNow;