const router = require('express').Router();
const verifyToken = require('../auth/verifyToken');
const Validation = require('../validation');
const Book = require('../model/Book')

router.post('/addbook', verifyToken, (req, res) => {
    //verify body
    const {error} = Validation.addBookValidation(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    //add book to DB
    


})

router.get('/purchase', (req, res) => {

})

router.post('/sellbook', (req, res) => {

});

module.exports = router;