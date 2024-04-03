
const pool = require('../db');
exports.createOrUpdateBook = (book_id, title, author, fk_category_id, price, quantity_available, description, publication_year, ISBN, image_url,is_deleted) => {
    return new Promise((resolve, reject) => {
      pool.query('CALL CreateOrUpdateBook(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [book_id, title, author, fk_category_id, price, quantity_available, description, publication_year, ISBN, image_url,is_deleted], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          const status = results[0][0].status;
          const message = results[0][0].message;
          resolve({ 'status': status, 'message': message });
        }
      });
    });
  };


  // Function to create or update an order
exports. createOrUpdateOrder = (order_id, customer_id, order_date, delivery_address, total_price, order_status, payment_method, is_deleted) => {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        reject({ status: 'error', message: 'Failed to connect to the database' });
        return;
      }

      // Call the stored procedure
      connection.query(
        'CALL CreateOrUpdateOrder(?, ?, ?, ?, ?, ?, ?, ?)',
        [order_id, customer_id, order_date, delivery_address, total_price, order_status, payment_method, is_deleted],
        (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            reject({ status: 'error', message: err.message });
            return;
          }

          // Extract status and message from the results of the stored procedure
          const { status, message } = results[0][0];
          
          // Resolve with the status and message
          resolve({ status, message });
        }
      );
    });
  });
};


exports.getAllOrders=()=>{

  const query = 'CALL GetAllOrdersWithDetails()';
  return new Promise((resolve, reject) => {
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving orders: ' + err.stack);
      resolve({ status: 'failure', message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      resolve({ status: 'failure', message: 'No Orders placed' });
    } else {
      resolve({ status: 'success', message: 'Order retrieved Successfully', data: results });
    }
  });
});
};

exports.updateOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve, reject) => {
    pool.query('CALL UpdateOrderStatus(?, ?)', [orderId, newStatus], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const status = results[0][0].status;
        const message = results[0][0].message;
        resolve({ status, message });
      }
    });
  });
};

exports.getBooksByFilter = (filterBookId, filterTitle, filterISBN, filterAuthor) => {
  return new Promise((resolve, reject) => {
    const sql = 'CALL GetBooksByFilter(?, ?, ?, ?)';
    pool.query(sql, [filterBookId, filterTitle, filterISBN, filterAuthor], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const data = results[0]; // Assuming the data is returned as the first result set
        if (data && data.length > 0) {
          resolve({ status: 'success', message: 'Books fetched successfully', data });
        } else {
          resolve({ status: 'failure', message: 'No books found' });
        }
      }
    });
  });
};

exports.createOrder = (customer_id, delivery_address, total_price, payment_method, order_status, order_details) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'CALL create_order(?, ?, ?, ?, ?, ?)',
      [customer_id, delivery_address, total_price, payment_method, order_status, JSON.stringify(order_details)],
      (err, results) => {
        if (err) {
          console.error('Error creating order: ' + err.stack);
          reject({ status: 'failure', message: 'Internal Server Error' });
        } else {
          const data=results[0];
          console.log(data);
          resolve({ status: 'success', message: 'Order created successfully',order_id:data[0].order_id });
        }
      }
    );
  });
};

exports.getOrderDetailsByCustomerID = function(customerID) {
  return new Promise((resolve, reject) => {
    const query = `CALL GetOrderDetailsByCustomerID(${customerID})`;

    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving order details:', err);
        reject(err);
      }

      if (!results[0] || results[0].length === 0) {
        resolve({ status: 'success', message: 'No orders found for the customer', data: null });
      } else {
        resolve({ status: 'success', message: 'Order details retrieved successfully', data: results[0] });
      }
    });
  });
};



exports.getTodaysSale = function() {
  return new Promise((resolve, reject) => {
    const query = 'CALL GetTodaysSale()';

    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving today\'s sale:', err);
        reject(err);
      }

      if (!results[0] || results[0].length === 0) {
        resolve({ status: 'success', message: 'No sales found for today', data: null });
      } else {
        resolve({ status: 'success', message: 'Today\'s sale retrieved successfully', data: results[0] });
      }
    });
  });
};

exports.getLast7DaysSales = () => {
  return new Promise((resolve, reject) => {
    const query = 'CALL GetLast7DaysSales()';
    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving last 7 days sales: ' + err.stack);
        reject({ status: 'failure', message: 'Internal Server Error' });
      } else {
        resolve({ status: 'success', message: 'Last 7 days sales retrieved successfully', data: results[0] });
      }
    });
  });
};


  