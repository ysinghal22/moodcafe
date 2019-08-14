const router = require('express').Router();
const verifyToken = require('../auth/verifyToken');

router.get('/addbook', verifyToken, (req, res) => {
    
})

router.get('/purchase', (req, res) => {

})

router.post('/sellbook', (req, res) => {

});

module.exports = router;