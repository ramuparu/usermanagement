const Customer = require("../models/customer.js");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
const homepage = async (req, res) => {

    const messages = await req.consumeFlash('info');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }
      
     
    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Customer.count();

      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }
}



/**
 * GET /
 * New Customer Form
 */
const addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
const postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * Customer Data 
*/
const view = async (req, res) => {

  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render('customer/view', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}



// /**
//  * GET /
//  * Edit Customer Data 
// */
const edit = async (req, res) => {

  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render('customer/edit', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}




// /**
//  * GET /
//  * Update Customer Data 
// */
const editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


// /**
//  * Delete /
//  * Delete Customer Data 
// */
const deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}


// /**
//  * Get /
//  * Search Customer Data 
// */
const searchCustomers = async (req, res) => {

  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("search", {
      customers,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}


module.exports = {
    homepage,addCustomer,postCustomer,view,edit,editPost,deleteCustomer,searchCustomers
 }

