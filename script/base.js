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
    var yin=typeof(obj[i])=="string"?"'"+obj[i]+"'":obj[i];
    %><%=yin%>,<%
  }%>)`;
 
  sql=mutil.ejs.render(sql,{
    tableName:tableName,
    obj:obj
  });
  sql=sql.replace(/,\)/g,")").replace(/&#39;/g,"'");
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
//解决sql中a=?的问题
function dosql(sql,obj) {
   var patton=/(\w+)\s*=\s*\?/g;
    var matchs=null;
    var copystr=sql;
    while(matchs=patton.exec(sql)){//不能在内部替换原有的字符串
        var temp=obj[matchs[1]];
        temp=typeof(temp)=="string"?"'"+temp+"'":temp;
        copystr=copystr.replace(/\?/,temp);
    }
    return copystr;
}
function runer(db,sql,obj,eventstr) {
    
    sql=dosql(sql,obj);
    db.run(sql,
    function(err) {
        if (err) {
            db.emit(eventstr[0]||'error',err,sql);
        } else {
            db.emit(eventstr[1]||'success');
        }
    });
}

function del(db,sql,obj) {
    runer(db,sql,obj,["delete-error","delete-success"])
}
function update(db,sql,obj) {
    runer(db,sql,obj,["update-error","update-success"])
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


// 改
function updateObj(db,obj) {


    if (!(obj&&db)) {
        throw "缺少必要参数";
        return;
    }

    var sql=`update <%=tableName%> set <%
        for(var i in data){
            var yin=typeof(data[i])=="string"?"'"+data[i]+"'":data[i];
            %><%=i%> = <%=yin%>,<%
        }
    %> where <%
        for(var i in where){
            var yin=typeof(where[i])=="string"?"'"+where[i]+"'":where[i];
            %><%=i%> = <%=yin%> and<%
        }
    %>;`;
    
    try{
        sql=mutil.ejs.render(sql,obj).replace(/&#39;/g,"'");
    }catch(err){
        throw err;
    }
    sql=sql.replace(/,\swhere/," where").replace(/and;/,";");
    console.log(sql);
    db.run(sql,
    function(err) {
        if (err) {
            db.emit('update-error',err);
        } else {
            db.emit('update-success');
        }
    });
}

function getSingle(db,sql, obj) {
    db.get(dosql(sql,obj),
    function(err, result) {
        if (err) {
            db.emit('get-error',err,sql);
        } else {
            db.emit('get-success',result);
        }
    });
}

function getAll(db,sql, obj) {
    db.all(dosql(sql,obj),
    function(err, result) {
        if (err) {
            db.emit('all-error',err,sql);
        } else {
            db.emit('all-success',result);
        }
    });
}



module.exports={
  getdb:getdb,
  insert:insert,
  insertObj:insertObj,
  createTable:createTable,
  updateObj:updateObj,
  update:update,
  getSingle:getSingle,
  getAll:getAll,
  delete:del,
}