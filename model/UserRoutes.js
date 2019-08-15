const router = require('express').Router();
const verifyToken = require('../auth/verifyToken');
const Validation = require('../validation');
const Book = require('../model/Book');
const Purchase = require('../model/Purchase');


//add book to DB
router.post('/addbook', verifyToken, async (req, res) => {
    //verify body
    const {error} = Validation.addBookValidation(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }


    // Check if book already exists
    // if it exists increment the quantity of book and update price if changed
    // if it does not exists then create new document

    let bookExist = await Book.findOne({title: req.body.title});

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

router.get('/purchase/:bookName', verifyToken, async (req, res) => {
    if(!req.params.bookName){
        return res.status(404).send("Please mention book title in req params");
    }
    const bookTitle = req.params.bookName.trim();
    
    // verify body
    // const {error} = Validation.purchaseValidation(bookTitle);
    // if(error){
    //     console.log("*****************************inside Purchase");
    //     return res.status(404).send(error.details[0].message);
    // }

    let bookExist = await Purchase.findOne({title: bookTitle});
    // console.log(bookExist);
    if(bookExist){
        let criteria = {
            _id: bookExist._id
        };
        let dataToUpdate = {
            $addToSet:{ 
                purchasedBy: {
                    email: req.user.email
                }
            },
            bookId: bookExist._id
        };

        Book.findByIdAndUpdate(criteria, dataToUpdate, {new: true}, (err, data) => {
            if(err){
                console.log(err)
                return res.status(400).json({err})
            }
            res.json({
                bookId: bookExist._id,
                email: req.user.email,
                message: "Purchase detail stored"
            })
        });
    } else{
        const purchase = new Purchase({
            $set:{purchasedBy: req.body.title},
            bookId: req.body.description
        })
        try{
            let newBook = await purchase.save();
            res.json({
                bookId: newBook._id,
                email: req.user.email,
                message: "Purchase detail stored"
            });
        }catch(err){
            console.log(err)
            return res.status(400).json({err});
        }
    }

})

router.post('/sellbook', (req, res) => {

});

module.exports = router;