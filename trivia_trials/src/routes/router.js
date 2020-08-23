const router = require('express').Router();
const checkAuth = require('./middleware/check-auth');
const pool = require('../models/database');
// You can require and use your routes here ;)
router.get('/',(req,res)=>{
    res.send("sthwe");


});
router.post('/login',(req,res) =>{
    //Check if code is right
    var username = req.body.username;
    var password = req.body.password;

    pool.query('SELECT id FROM user WHERE user.password =$1 AND user.username= $2', [password,username], (error, results) => {
        if (error) {
            throw error
        }
        console.log(result.username)
        const token = jwt.sign({
                username:result.username

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
    pool.query('SELECT id FROM user WHERE user.username =$1',[req.userData.username],(error,results)=>{
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    });
});
router.post('/createquiz',checkAuth,(req,res)=>{
    const name = req.body.name;
    pool.query('SELECT id FROM question ORDER BY RAND() LIMIT 6',(error,results)=>{
        pool.query('INSERT INTO quiz (name,questions) VALUES ($1,$2)',[name,results.toString()],(error,results) =>{
            if(error){
                throw error;
            }
            res.status(201).send('created');
        })


    });


});
router.get('/questions',checkAuth,(req,res) =>{

    pool.query('SELECT * FROM question WHERE question.id=$1',[req.body.id],(error,results)=>{
        if (error) {
            throw error;
        }
        res.status(201).json(results.rows);

    });

});

router.get('/answer',checkAuth,(req,res)=>{
    const q= req.question;
    pool.query('SELECT * FROM question WHERE question.text=$1',{q},(error,results)=>{
        if(error){
            throw error;
        }
        res.status(201).json(results.answer==req.body.answer);
    });


});
module.exports = router;
