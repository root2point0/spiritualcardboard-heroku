const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');

//////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////


router.get('/seed', (req,res)=>{
    Cart.collection.drop();
    Cart.create([
        {idArray: []},
    ], (err, data)=>{
        res.redirect('/cart');
    })
});

// display cart
router.get('/', (req,res) => {
    Cart.findOne({}).populate('idArray').then( (found) => {
        res.render('checkout.ejs', {
            cart : found.idArray,
        });
    });
});


// delete item from cart
router.get('/remove/:id', (req,res) => {
    Cart.findOneAndUpdate({},{$pull: { idArray : req.params.id}}, {new: true}, (err,cart) => {
        res.redirect('/cart/');
    });
});

// add item to cart
router.get('/add/:id', (req,res) => {
    Cart.findOneAndUpdate({},{$push: { idArray : req.params.id}}, {new: true}, (err,cart) => {
        res.redirect('/prints/'+req.params.id);
    });
});

module.exports = router;