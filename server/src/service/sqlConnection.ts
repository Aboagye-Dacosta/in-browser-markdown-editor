import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./markdown.db',);

//with serialize method
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS markdown (
        markdownId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        pathName Text,
        fileId Text)`
    );
});


export default db;