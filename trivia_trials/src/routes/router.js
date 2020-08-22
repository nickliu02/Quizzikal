const router = require('express').Router();


// You can require and use your routes here ;)
router.get('/create',(req,res) =>{
    res.send("We are on rooms");
});


module.exports = router;
