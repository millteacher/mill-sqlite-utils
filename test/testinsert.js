var sqlite=require("../index.js");
var dbutil=sqlite.base;
var db=dbutil.getdb("test.db");

/*dbutil.insert(db,"insert into CardType(cardId, cardName, vouchNo, vouchLab, createTime, updateTime, status) values(?, ?, ?, ?, ?, ?, ?)",{
	'cardId': '08',
    'cardName': '测试卡',
    'vouchNo': '9',
    'vouchLab': 'card9',
    'createTime': '2016-03-31 13:30:00',
    'updateTime': '2016-03-31 13:30:00',
    'status': 'Y'
});*/

/*dbutil.insertObj(db,"CardType",{
	'cardId': '08',
    'cardName': '测试卡',
    'vouchNo': '9',
    'vouchLab': 'card9',
    'createTime': '2016-03-31 13:30:00',
    'updateTime': '2016-03-31 13:30:00',
    'status': 'Y'
});*/

/*var sql=`CREATE TABLE "CardType" (
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
});*/


    
/*var obj={
    tableName:"CardType",
    data:{
        'cardName': '测试卡A',
        'updateTime': '2016-03-31 13:30:01'
    },
    where:{
        'cardId': '07'
    }
}
dbutil.updateObj(db,obj);*/

/*var obj={
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
});*/

/*dbutil.getAll(db,"select * from CardType",{cardId:'07'});
db.on('all-success',function (data) {
    console.warn(data);
});*/

/*dbutil.getSingle(db,"select * from CardType where cardId = ?",{cardId:'07'});
db.on('get-success',function (data) {
    console.warn(data);
});*/

dbutil.delete(db,"delete from CardType where cardId = ?",{cardId:'08'});
db.on('delete-success',function () {
    console.warn('删除成功');
});