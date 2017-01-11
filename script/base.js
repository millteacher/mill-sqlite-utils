var SQLite3 = require('sqlite3').verbose();
var mutil = require('mill-n-utils');

function getdb(path) {
  var db = new SQLite3.Database(path);
  mutil.eventBind(db);
  return db;
}


// 增
function insert(db,sql,obj) {
  var regstr=/insert\s+into\s+\w*\((.*?)\)\s+values/i;
    if (!regstr.test(sql)) {
        var msg="请输入sql:insert into 表名(字段1, 字段2...) values(值1,值2...)";
        db.emit('insert-sql-error',msg);
        return;
    }
    var fields= RegExp.$1.split(",");
    var vals=[];
    fields.forEach(function (item,index,arr) {
        var val=obj[item]||"";
        vals.push(val);
    });
    db.run(sql, vals,
    function(err) {
        db.emit('insert-error',err);
    });
}

function createTable(argument) {
  var sql=`CREATE TABLE "CardType" (
    "cardId"  TEXT NOT NULL,
    "cardName"  TEXT,
    "vouchNo"  INTEGER,
    "vouchLab"  TEXT,
    "createTime"  TEXT,
    "updateTime"  TEXT,
    "status"  TEXT,
    PRIMARY KEY ("cardId")
    );  `
}

module.exports={
  getdb:getdb,
  insert:insert,
}