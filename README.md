# mill-sqlite-utils

#### 获取对象
```
var sqlite=require("mill-sqlite-utils");
var dbutil=sqlite.base;
var db=dbutil.getdb("test.db");
```

#### 插入数据
1. 对象方式
```
function insertObj(db,tableName,obj)
```
比如：
```
dbutil.insertObj(db,"CardType",{
	'cardId': '08',
    'cardName': '测试卡',
    'vouchNo': '9',
    'vouchLab': 'card9',
    'createTime': '2016-03-31 13:30:00',
    'updateTime': '2016-03-31 13:30:00',
    'status': 'Y'
});
```

2. sql方式

```
function insert(db,sql,obj)
```
比如
```
dbutil.insert(db,"insert into CardType(cardId, cardName, vouchNo, vouchLab, createTime, updateTime, status) values(?, ?, ?, ?, ?, ?, ?)",{
	'cardId': '07',
    'cardName': '测试卡',
    'vouchNo': '9',
    'vouchLab': 'card9',
    'createTime': '2016-03-31 13:30:00',
    'updateTime': '2016-03-31 13:30:00',
    'status': 'Y'
});
```

3. 事件
```
insert-error : 插入错误
insert-sql-error : 插入时sql验证错误

db.on('insert-error',function (err) {
	console.log(err);
});
```

#### 创建表
内部会对sql进行简单判断,如果提供的sql格式不对,会提示sql的规范格式.
前提是监听并打印create-table-error事件结果
```
var sql=`CREATE TABLE "CardType" (
"cardId"  TEXT NOT NULL,
"cardName"  TEXT,
"vouchNo"  INTEGER,
"vouchLab"  TEXT,
"createTime"  TEXT,
"updateTime"  TEXT,
"status"  TEXT,
PRIMARY KEY ("cardId")
);

`;

dbutil.createTable(db,sql);
db.on('create-table-error',function (err) {
    console.log(err);
});

db.on('create-table-success',function (err) {
    console.log(err);
});
```

#### 更新表

对于简单的更新语句可以直接使用updateObj方法
```
var obj={
    tableName:"CardType",
    data:{
        'cardName': '测试卡X',
        'updateTime': '2016-03-31 13:30:01'
    },
    where:{
        'cardId': '07'
    }
}
dbutil.updateObj(db,obj);
```
以上代码内部会生成类似
`update CardType set cardName = '测试卡X',updateTime = '2016-03-31 13:30:01' where cardId = 07 ;`
的sql语句

对于复杂的更新语句，可以使用sql语句的方式

```
var obj={
    'cardName': '测试卡DD',
    'updateTime': '2016-03-31 13:30:01',
    'cardId': '07'
}

dbutil.update(db,"update CardType set cardName = ?, updateTime = ? where cardId = ?",obj);

db.on('update-error',function (sql) {
   console.warn(sql);
});
db.on('update-success',function () {
   console.warn("更新成功");
});
```

#### 删除数据

```
dbutil.delete(db,"delete from CardType where cardId = ?",{cardId:'08'});
db.on('delete-success',function () {
    console.warn('删除成功');
});
```

#### 查询数据
getAll，返回的将是一个数组，包含满足条件的所有的行
```
dbutil.getAll(db,"select * from CardType where cardId = ?",{cardId:'07'});
db.on('all-success',function (data) {
    console.warn(data);
});
```
getSingle,返回的是满足条件的第一行
```
/*dbutil.getSingle(db,"select * from CardType where cardId = ?",{cardId:'07'});
db.on('get-success',function (data) {
    console.warn(data);
});*/
```