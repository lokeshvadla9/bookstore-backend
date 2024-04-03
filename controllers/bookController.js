const bookModel = require('../models/bookModel');


  exports.createOrUpdateBook = async (req, res) => {
    try {
      const { book_id, title, author, fk_category_id, price, quantity_available, description, publication_year, ISBN, image_url,is_deleted } = req.body;
      
      const result = await bookModel.createOrUpdateBook(book_id, title, author, fk_category_id, price, quantity_available, description, publication_year, ISBN, image_url,is_deleted);
      
      res.json(result);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({status:'failure', error: 'Internal server error' });
    }
};

exports.getAllOrders = async(req,res) =>{
    try{
        const result=await bookModel.getAllOrders();
        res.json(result);
    }catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({status:'failure', error: 'Internal server error' });
    }
  
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const result = await bookModel.updateOrderStatus(orderId, newStatus);
    res.json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ status: 'failure', error: 'Internal server error' });
  }
};

exports.getBooksByFilter = async (req, res) => {
  try {
    const { filterBookId, filterTitle, filterISBN, filterAuthor } = req.body;
    const { status, message, data } = await bookModel.getBooksByFilter(filterBookId, filterTitle, filterISBN, filterAuthor);
    
    // Respond with status and message
    if (data) {
      res.status(200).json({ status, message, data });
    } else {
      res.status(404).json({ status, message });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.createOrUpdateOrder = async (req, res) => {
  try {
    const { order_id, customer_id, order_date, delivery_address, total_price, order_status, payment_method, is_deleted } = req.body;
    
    // Call the model function to create or update the order
    const response = await bookModel.createOrUpdateOrder(order_id, customer_id, order_date, delivery_address, total_price, order_status, payment_method, is_deleted);
    
    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  const { customer_id, delivery_address, total_price, payment_method, order_status, order_details } = req.body;

  try {
    const result = await bookModel.createOrder(customer_id, delivery_address, total_price, payment_method, order_status, order_details);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOrderDetailsByCustomerID = function(req, res) {
  const {customer_id} = req.body;

  // Call the model function to fetch order details by customer ID
  bookModel.getOrderDetailsByCustomerID(customer_id)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error retrieving order details:', error);
      res.status(500).json({ status: 'failure', message: 'Internal Server Error' });
    });
};


exports.getTodaysSale = function(req, res) {
  bookModel.getTodaysSale()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    });
};


exports.getLast7DaysSales = (req, res) => {
  bookModel.getLast7DaysSales()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

  
  