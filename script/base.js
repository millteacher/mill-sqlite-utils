var SQLite3 = require('sqlite3').verbose();
var mutil = require('mill-n-utils');

function getdb(path) {
  var db = new SQLite3.Database(path);
  mutil.eventBind(db);
  return db;
}

function insertObj(db,tableName,obj) {
  console.warn(Object.keys(obj).length);
  var sql=`insert into 
  <%=tableName%>(<%for (var i in obj) {
    %><%=i%>,<%
  }%>) 
  values(<%for (var i in obj) {
    %>'<%=obj[i]%>',<%
  }%>)`;
 
  sql=mutil.ejs.render(sql,{
    tableName:tableName,
    obj:obj
  });
  sql=sql.replace(/,\)/g,")");
   console.log(sql);
   db.run(sql, [],
    function(err) {
        db.emit('insert-error',err);
   });
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
        var val=obj[item.trim()]||"";
        vals.push(val);
    });
    db.run(sql, vals,
    function(err) {
        db.emit('insert-error',err);
    });
}

function createTable(db,sql) {
  if(!(/create\s+table\s+/i.test(sql))){
    var msg=`标准格式: CREATE TABLE 表名 (
        "主键名"  主键类型 NOT NULL,
        "字段1"  TEXT,
        "字段2"  INTEGER,
        ...
        PRIMARY KEY ("主键名")
        );  `;
        db.emit('create-table-error',msg);
        return;
  }
  db.run(sql,function (err,res) {
      if(err){
        db.emit('create-table-error',err);
      }else{
        db.emit('create-table-success',res);
      }
  });
}

module.exports={
  getdb:getdb,
  insert:insert,
  insertObj:insertObj,
  createTable:createTable,
}