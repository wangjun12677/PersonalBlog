var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({
        host:"192.168.1.2",
        port:"3306",
        user:"root",
        password:"wangjun12677",
        database:"my_blog"
    });
    return connection;
}

module.exports.createConnection = createConnection;