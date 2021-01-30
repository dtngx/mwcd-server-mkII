var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8085

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Server is running on port %PORT%".replace("%PORT%", HTTP_PORT) })
});

//check login
app.post("/users/login/", (req, res) => {
    var errors = []
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    params = [req.body.username, req.body.password]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        return row
            ? res.json({
                "message": "success",
                "data": row.usertype,
                "user_id": row.user_id
            })
            : res.json({
                "message": "invalid"
            })

    });
});

//get projects for id
app.post("/userproject/", (req, res, next) => {
    var errors = []
    var data = {
        id: req.body.user_id
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    sql = 'SELECT * FROM project WHERE project_id = ?';
    params = [data.id]
    db.get(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        return result
        ? res.json({
            "message": "success",
            "data": result
        })
        : res.json({
            "message": "invalid"
        })
    });
});

// Create a new project
app.post("/projects/", (req, res, next) => {
    var errors = []
    var data = {
        id: req.body.project_id,
        name: req.body.name,
        startdate: req.body.startdate
    }
    if (!data.name || !data.id || !data.startdate) {
        errors.push("Project ID, Name or Startdate for project not specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    sql = 'INSERT INTO project (project_id, name, startdate) VALUES (?, ?, ?)';
    var params = [data.project_id, data.name, data.startdate]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
});

//create new user

//create new knowledge

// Default response
app.use(function (req, res) {
    res.status(404);
});


/*


// list all projects DANGER
app.get("/projects", (req, res, next) => {
    var sql = `SELECT * FROM project`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
// list all users DANGER
app.get("/users", (req, res, next) => {
    sql = `SELECT * FROM user`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

*/