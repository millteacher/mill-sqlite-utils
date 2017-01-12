var sql="update CardType set cardName = ?, updateTime = ? where cardId = ?";
var patton=/(\w+)\s*=\s*\?/g;




var matchs=null;
var copystr=sql;
while(matchs=patton.exec(sql)){
	console.warn(matchs);
	copystr=copystr.replace(matchs[1],"a").replace(/\?/,"b");

}
console.warn(copystr);

	

