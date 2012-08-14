var db = Ti.Database.open('Rayapp');
db.execute('CREATE TABLE IF NOT EXISTS content(id INTEGER PRIMARY KEY, partido TEXT, dato TEXT, trivia TEXT, date TEXT);');
db.execute("INSERT INTO content(name,captured) VALUES(?,?)",_name,0);
db.close();

exports.getPartidoForToday = function(){

};