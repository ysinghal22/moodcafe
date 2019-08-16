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

    if(req.body.quantity<1){
        console.log("message: Quantity must be greater than 0")
        return res.status(404).send({message: "Quantity must be greater than 0"})
    }

    let responseToSend = []
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
                responseToSend.push(err); 
                console.log(err)
                return res.status(500).send(responseToSend)
            }
            let response = data;
            response.addedQuantity = req.body.quantity
            responseToSend.push(response);
            console.log(responseToSend);
            res.send(responseToSend)
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
            responseToSend.push(newBook)
            console.log(responseToSend)
            res.send(responseToSend);
        }catch(err){
            responseToSend.push(err)
            console.log(responseToSend)
            return res.status(400).send(responseToSend);
        }
    }
    

})

router.get('/purchase/:bookName', verifyToken, async (req, res) => {
    if(!req.params.bookName){
        return res.status(404).send("Please mention book title in req params");
    }
    const bookTitle = req.params.bookName.trim();
    let responseToSend = []
    
    let bookInStock = await Book.findOne({title: bookTitle});

    if(bookInStock && bookInStock.quantity>0){
        let bookExist = await Purchase.findOne({bookId: bookInStock._id});
        // console.log(bookExist);
        if(bookExist){
            let criteria = {
                bookId: bookExist.bookId
            };
            let dataToUpdate = {
                $push:{ 
                    purchasedBy: {
                        email: req.user.email
                    }
                }
            };
            Purchase.findOneAndUpdate(criteria, dataToUpdate,{new:true, useFindAndModify:false}, (err, doc) => {
                if(err){
                    responseToSend.push(err)
                    console.log(responseToSend);
                    res.status(500).send(responseToSend);
                }
                if(doc && doc.length>0){
                    let purchaseDetail = {
                        bookId: bookExist.bookId,
                        email: req.user.email,
                        message: "Purchase detail stored"
                    };
                    responseToSend.push(purchaseDetail);
                    console.log("Book purchased /n",responseToSend)
                    res.send(responseToSend);
                }
                responseToSend.push({message: "Book is not available"})
                console.log(responseToSend);
                res.status(500).send(responseToSend);
            })
        } else{
            let responseToSend = []
            const purchasedBy = [];
            purchasedBy.push({email: req.user.email})
            let dataToSave = {
                // $push:{ 
                purchasedBy: purchasedBy,
                bookId: bookInStock._id
            }
            const purchase = new Purchase(dataToSave)
            try{
                let newBook = await purchase.save();
                let purchaseDetail = {
                    bookId: newBook._id,
                    email: req.user.email,
                    message: "Purchase detail stored"
                };
                responseToSend.push(purchaseDetail)
                console.log(purchaseDetail)
                res.send(responseToSend);
            }catch(err){
                console.log(err)
                return res.status(400).send(err);
            }
        }

    }
});

router.get('/sellbook/:bookName', (req, res) => {
    if(!req.params.bookName){
        return res.status(404).send("Please mention book title in req params");
    }
    const bookTitle = req.params.bookName.trim();
    
    let responseToSend = []
    
    let criteria = {
        title: bookTitle
    };
    let dataToUpdate = {
        $inc: {quantity: -1}
    };
    if(req.query.quantity){
        dataToUpdate = {
            $inc: {quantity: -1}
        };
    }

        Book.findOneAndUpdate(criteria, dataToUpdate, {useFindAndModify: false}, (err, doc)=>{
            if(err){
                responseToSend.push(err);
                res.status(500).send(responseToSend);
            }
            if(doc && doc.length > 0 && doc.quantity>0){
                let dataToSend = {
                    title: doc.title,
                    description: doc.description,
                    price: doc.price
                }
                responseToSend.push(dataToSend)
                console.log(doc);
                res.send(responseToSend);
            }
            responseToSend.push({message: "Book is not available"})
            console.log(responseToSend)
            res.send(responseToSend)
        })
});

module.exports = router;