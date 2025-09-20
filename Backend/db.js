const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./blog.db");

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
        )`);
});

module.exports = db;