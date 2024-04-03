// userModel.js

const pool = require('../db');
const {sendEmail}=require('../models/EmailModel');

exports.checkLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query('CALL CheckLogin(?, ?)', [email, password], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        const loginStatus = results[0][0].status;
        const message = results[0][0].message;
        let data = null;
        if (loginStatus === 'success') {
          const userData = results[0][0];
          data = {
            customer_id: userData.customer_id,
            email: userData.email,
            password: userData.password,
            first_name: userData.first_name,
            last_name: userData.last_name,
            address: userData.address,
            phone_number: userData.phone_number
          };
        }
        resolve({ status: loginStatus, message, data });
      }
    });
  });
};


exports.registerOrUpdateCustomer = (customerId, email, password, firstName, lastName, address, phoneNumber,isDeleted) => {

    return new Promise((resolve, reject) => {
      pool.query('CALL RegisterOrUpdateCustomer(?, ?, ?, ?, ?, ?, ?,?)', [customerId, email, password, firstName, lastName, address, phoneNumber,isDeleted], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          const message = results[0][0].message;
          const status=results[0][0].status;
          resolve({ 'status':status,'message':message });
        }
      });
    });
  };


  exports.forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      pool.query('CALL GetPasswordByEmail(?)', [email], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          const message = results[0][0].message;
          const status=results[0][0].status;
          const password=results[0][0].password;
          const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333333;
            margin-top: 0;
          }
          p {
            color: #666666;
          }
          .password {
            font-size: 18px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 20px;
          }
          .footer {
            border-top: 1px solid #eeeeee;
            padding-top: 20px;
            margin-top: 20px;
            text-align: center;
          }
          .footer p {
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Your Password is :</p>
          <p class="password"><b>${password}</b></p>
          <div class="footer">
            <p>It is highly advisable to update your password promptly after receiving it via email.</p>

            <p>Thank you,</p>
            <p>Admin, Bookstore UTA</p>
          </div>
        </div>
      </body>
      </html>
    `;
    if(status=='success')
    {
      const isSent=sendEmail(email,'Forgot Password',htmlTemplate);
      if(isSent){
        resolve({ 'status':'success','message':'Email has been sent, please check your email' });
      }
      else{
        resolve({ 'status':'failure','message':'Something went wrong, try after sometime' });
      }
    }
    else{
      resolve({ 'status':status,'message':message });
    }
}
      });
    });
  };


  exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
      pool.query('CALL GetAllUserDetails()', (error, results) => {
        if (error) {
          console.error('Error fetching user details:', error);
          return reject({ 
            status: "error", 
            message: "Error fetching user details",
            error: error 
          });
        } else {
          if (results[0].length === 0) {
            
            return resolve({ 
              status: "failure", 
              message: "No users", 
              data: null 
            });
          } else {
            // Handling success
            return resolve({ 
              status: "success", 
              message: "Fetched successfully", 
              data: results[0] 
            });
          }
        }
      });
    });
  };
  

  exports.insertContactUs = (name, email, subject, message) => {
    return new Promise((resolve, reject) => {
        const query = 'CALL insert_contact_us(?, ?, ?, ?)';
        pool.query(query, [name, email, subject, message], (err, results) => {
            if (err) {
                console.error('Error inserting contact us details: ', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.getAllContactQueries = () => {
  const query = 'CALL GetAllContactQueries()';
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving contact queries: ' + err.stack);
        reject(err);
      } else {
        resolve(results[0]); // Assuming the result is returned as the first element of the results array
      }
    });
  });
};

exports.updateQueryStatus = async (query_id, new_status) => {
  const query = 'CALL UpdateQueryStatus(?, ?)';
  const params = [query_id, new_status];

  try {
      const results = await pool.query(query, params);
      return { status: 'success', message: 'Query status updated successfully' };
  } catch (error) {
      console.error('Error updating query status:', error);
      return { status: 'failure', message: 'Failed to update query status' };
  }
}