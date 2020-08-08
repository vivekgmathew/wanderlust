const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

app.post("/login", (req, res) => {
    console.log("Inside login method .....")
    let body = JSON.parse(JSON.stringify(req.body))
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "wanderlust"
    });

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT name, password FROM registration", function (err, result, fields) {
            if (err) throw err;
            console.log("Query is successful")
            if (body.name === result[0].name && body.password === result[0].password)
                res.send(`success`)
            else
                res.send("failed")
        });
    });
});

app.post("/register", (req, res) => {

    let bodyObj = JSON.parse(JSON.stringify(req.body))

    let name = bodyObj.name
    let pass = bodyObj.password
    let age = bodyObj.age
    let email = bodyObj.email

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "wanderlust"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql =
            `INSERT INTO registration (name, password, age, email) VALUES ('${name}', '${pass}', ${age}, '${email}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send(`${bodyObj.name} signed up for the application`)
        });
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`))

