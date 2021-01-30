var sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('hk_complete.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err
   }
  console.log('Connected to the H+K database.');
});

// create table 'project'
var sql='CREATE TABLE project (project_id TEXT, name TEXT, startdate DATE, projectteam TEXT)';
db.run(sql, (err) => {
  if (err) {
    console.log('Project Table already created.');
  }else{
    console.log('Project Table created.');
    var insert = 'INSERT INTO project (project_id, name, startdate, projectteam) VALUES (?, ?, ?, ?)';
    db.run(insert, ["1", "Project 1", '2020-12-10', "1"])
    db.run(insert, ["2", "Project 2", '2020-12-10', "2"])
    db.run(insert, ["3", "Project 1", '2020-12-10', "1"])
  }
});

// create table 'user'
sql='CREATE TABLE user (user_id INT NOT NULL UNIQUE, username TEXT, password TEXT, usertype TEXT, email TEXT)';
db.run(sql, (err) => {
  if (err) {
    console.log('User Table already created.');
    }
    else {
      //creating default users
      console.log('User Table created.');
      var insert = 'INSERT INTO user (user_id, username, password, usertype) VALUES(?, ?, ?, ?)';
      db.run(insert, [00001, "manager", "manager", "Manager"])
      db.run(insert, [00002, "client", "client", "Client"])
      db.run(insert, [00003, "employee", "employee", "Employee"])
    }
});

module.exports = db


//TODO 

/* 
add 

  , projects ARRAY

to the User Table
*/

/*
add a KnowledgeTable
*/