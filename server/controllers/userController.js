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
        connection.query('SELECT * FROM user WHERE  status = "active"', (err, rows) => {
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

// render the form
exports.form = (req,res) =>{
     res.render('add_user');
}

// add new user
exports.create = (req,res) =>{
    const { firstname,lastname,email,phone,comments } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as Id' + connection.threadId);

          let searchTerm = req.body.search;
        // use connection
        connection.query('INSERT  INTO user SET firstname = ?,lastname = ?, email = ?, phone = ?, comments = ?',[firstname, lastname, email, phone, comments], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('add_user', {alert: 'User added successfully'});
            }else{
                console.log(err);
            }

            console.log('The data from table \n', rows);
        });
    });
}


// edit user
exports.edit = (req,res) =>{
     pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as Id' + connection.threadId);

         
        // use connection
        connection.query('SELECT * FROM user WHERE  id = ?',[req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('edit_user', { rows });
            }else{
                console.log(err);
            }

            console.log("The data edited is", rows);
        });
    });
}

// update user
exports.update = (req,res) =>{
    const { firstname,lastname,email,phone,comments } = req.body

    pool.getConnection((err, connection) => {
       if (err) throw err;
       console.log('Connected as Id' + connection.threadId);

        
       // use connection
       connection.query('UPDATE user SET firstname = ?, lastname = ?, email = ?, phone = ?, comments = ? WHERE id = ?',[firstname, lastname,email,phone,comments, req.params.id], (err, rows) => {
           connection.release();

           if (!err) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                console.log('Connected as Id' + connection.threadId);
        
                 
                // use connection
                connection.query('SELECT * FROM user WHERE  id = ?',[req.params.id], (err, rows) => {
                    connection.release();
        
                    if (!err) {
                        res.render('edit_user', { rows, alert:`${firstname} has been updated successfully` });
                    }else{
                        console.log(err);
                    }
        
                    console.log("The data edited is", rows);
                });
            });
           }else{
               console.log(err);
           }

           console.log("The data edited is", rows);
       });
   });
}

// delete user
exports.delete = (req,res) =>{
    pool.getConnection((err, connection) => {
       if (err) throw err;
       console.log('Connected as Id' + connection.threadId);

        
       // use connection
       connection.query('DELETE FROM user WHERE  id = ?',[req.params.id], (err, rows) => {
           connection.release();

           if (!err) {
               res.redirect('/');
           }else{
               console.log(err);
           }

           console.log("The data edited is", rows);
       });
   });
}
//     pool.getConnection((err, connection) => {
//        if (err) throw err;
//        console.log('Connected as Id' + connection.threadId);

        
//        // use connection
//        connection.query('UPDATE  user SET status = ? WHERE  id = ?',['removed',req.params.id], (err, rows) => {
//            connection.release();

//            if (!err) {
//                res.redirect('/');
//            }else{
//                console.log(err);
//            }

//            console.log("The deleted rows are", rows);
//        });
//    });


// }