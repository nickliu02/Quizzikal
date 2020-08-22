const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const pool = require('../models/database');
// You can require and use your routes here ;)
router.get('/login',checkAuth,(req,res) =>{
    //Check if code is right
    var passcode = req.body.passcode;
    console.log(passcode)
    let db = new sqlite3.Database('./databases/database.db', function(error){
        if (error){
            console.log(error);
        }
        else{
            console.log("Made database");
        }
    })

    let sql = 'SELECT id FROM user WHERE user.passcode = ?';
    db.get(sql,[passcode], (err,row) => {
        if (err){
            console.log(err,"lmao")

        }
        else{
            if (row){
                console.log(row.id)
                const token = jwt.sign({
                        id:row.id

                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    })
                db.close(function(error){
                    if (error){
                        console.log(error)
                    }
                    else{
                        console.log("DB successfully closed")
                    }
                })
                res.status(200).json({
                    accessToken: token
                });
            }
            else{
                db.close(function(error){
                    if (error){
                        console.log(error)
                    }
                    else{
                        console.log("DB successfully closed")
                    }
                })
                res.status(409).json({
                    accessToken: null
                })
            }
        }


    })
});
router.post('/register',(req,res) =>{
    const { name, email, password } = req.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email,password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })

});
router.get('/profile',checkAuth,(req,res) =>{
    res.send("We are on rooms");
});
router.get('/question',checkAuth,(req,res) =>{

});
router.get('/profile',checkAuth,(req,res) =>{
    response.status(201).send
});
router.get('/leaderboards',checkAuth,(req,res) =>{

});


module.exports = router;
