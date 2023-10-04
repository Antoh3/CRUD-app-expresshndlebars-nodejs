const mysql = require('mysql2');


// database
var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// view users
exports.view = (req, res) => {
    // CONNECT DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as Id' + connection.threadId);


        // use connection
        connection.query('SELECT * FROM user', (err, rows) => {
            connection.release();

            if (!err) {
                res.render('home', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from table \n', rows);
        });
    });
}

// find uder 
exports.find = (req,res) =>{
     // CONNECT DB
     pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as Id' + connection.threadId);

          let searchTerm = req.body.search;
        // use connection
        connection.query('SELECT * FROM user WHERE firstname LIKE ? OR lastname LIKE ?', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('home', { rows });
            }else{
                console.log(err);
            }

            console.log('The data from table \n', rows);
        });
    });
}

// add new user
exports.form = (req,res) =>{
    res.render('add_user');
}