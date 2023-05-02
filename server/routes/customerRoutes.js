const express = require('express');
const router = express.Router();
const { homepage, addCustomer, postCustomer , view, edit , editPost,deleteCustomer,searchCustomers } = require('../controller/customerController');

/**
 *  Customer Routes 
*/
router.get('/', homepage);
router.get('/add', addCustomer);
router.post('/add', postCustomer);
router.get('/view/:id', view);
router.get('/edit/:id', edit);
router.put('/edit/:id', editPost);
router.delete('/edit/:id', deleteCustomer);

router.post('/search', searchCustomers);



module.exports = router;