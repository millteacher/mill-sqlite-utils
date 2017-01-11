# mill-sqlite-utils

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