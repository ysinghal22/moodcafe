const router = require('express').Router();
const verifyToken = require('../auth/verifyToken');
const Validation = require('../validation');
const Book = require('../model/Book');


router.post('/addbook', verifyToken, async (req, res) => {
    //verify body
    const {error} = Validation.addBookValidation(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    //add book to DB
    let criteria = {
        title: req.body.title
    };

    // Check if book already exists
    // if it exists increment the quantity of book and update price if changed
    // if it does not exists then create new document

    let bookExist = await Book.findOne({title: req.body.title});
    // console.log("**************************",bookExist)

    if(bookExist){
        let criteria = {
            _id: bookExist._id
        };
        let dataToUpdate = {
            price: req.body.price,
            $inc: {quantity: req.body.quantity}
        };

        Book.findByIdAndUpdate(criteria, dataToUpdate, {new: true}, (err, data) => {
            if(err){
                console.log(err)
                return res.status(400).json({err})
            }
            console.log("*****************------------>Updated Book\n",data);
            res.json({
                data
            })
        });
    } else{
        const book = new Book({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        })
        try{
            let newBook = await book.save();
            console.log("**************------>New Book created\n",newBook)
            res.json(newBook);
        }catch(err){
            console.log(err)
            return res.status(400).json({err});
        }
    }
    

})

router.get('/purchase', (req, res) => {

})

router.post('/sellbook', (req, res) => {

});

module.exports = router;