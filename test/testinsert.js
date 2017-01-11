var sqlite=require("../index.js");
var dbutil=sqlite.base;
var db=dbutil.getdb("test.db");

/*dbutil.insert(db,"insert into CardType(cardId, cardName, vouchNo, vouchLab, createTime, updateTime, status) values(?, ?, ?, ?, ?, ?, ?)",{
	'cardId': '07',
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