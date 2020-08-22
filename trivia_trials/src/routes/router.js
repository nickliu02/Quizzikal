const router = require('express').Router();
const checkAuth = require('./middleware/check-auth');
const pool = require('../models/database');
// You can require and use your routes here ;)
router.get('/',(req,res)=>{
    res.send("sthwe");


});
router.post('/login',(req,res) =>{
    //Check if code is right
    var passcode = req.body.passcode;


    pool.query('SELECT id FROM user WHERE user.passcode = passcode VALUE $1', [passcode], (error, results) => {
        if (error) {
            throw error
        }
        console.log(result.insertId)
        const token = jwt.sign({
                id:result.insertId

            },
            process.env.JWT_KEY,
            {
                expiresIn:"1h"
            });
        res.status(201).json({accessToken:token});

    })

});
router.post('/register',(req,res) =>{
    const { name, email, password } = req.body;
    pool.query('INSERT INTO users (name,password) VALUES ($1, $2)', [name, password], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added with ID: ${result.insertId}`)
    })

});
router.get('/profile',checkAuth,(req,res) =>{
    const name = req.body.name;
    pool.query('',[name],(error,results)=>{
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    });
});
router.get('/questions',checkAuth,(req,res) =>{

    pool.query('',(error,results)=>{
        if (error) {
            throw error
        }
        res.status(201).json(results.rows);

    });

});
router.get('/leaderboards',checkAuth,(req,res) =>{

});


module.exports = router;
