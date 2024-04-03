const userModel = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.checkLogin(email, password);
    if (result.status === 'success') {
      // Extract user data from result
      const userData = {
        customer_id: result.data.customer_id,
        email: result.data.email,
        password:result.data.password,
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        address: result.data.address,
        phone_number: result.data.phone_number
      };
      res.json({ status: 'success', message: 'Login successful', data: userData });
    } else {
      res.json({ status: 'failure', message: 'Login failed', data: null });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error', data: null });
  }
};


exports.registerOrUpdateCustomer = async (req, res) => {
    const { customerId, email, password, firstName, lastName, address, phoneNumber,isDeleted } = req.body;
    console.log('customerId:', customerId, 'email:', email, 'password:', password, 'firstName:', firstName, 'lastName:', lastName, 'address:', address, 'phoneNumber:', phoneNumber, 'isDeleted:', isDeleted);

    try {
      const result = await userModel.registerOrUpdateCustomer(customerId, email, password, firstName, lastName, address, phoneNumber,isDeleted);
      res.json({ status: result.status, message: result.message });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };


  exports.forgotPassword = async (req, res) => {
    const { email} = req.body;
    try {
      const result = await userModel.forgotPassword(email);
      res.json({ status: result.status, message: result.message });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  exports.getAllUsers = (req, res) => {
    userModel.getAllUsers()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching user details:', error);
        res.status(500).json({ 
          status: "error", 
          message: "Internal Server Error",
          error: error 
        });
      });
  };

  exports.postContactUs = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await userModel.insertContactUs(name, email, subject, message);
        res.status(200).json({ status: 'success', message: 'Contact details inserted successfully' });
    } catch (error) {
        console.error('Error inserting contact us details: ', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

exports.getAllContactQueries = async (req, res) => {
  try {
    const contactQueries = await userModel.getAllContactQueries();
    res.json({ status: 'success', message: 'Contact queries retrieved successfully', data: contactQueries });
  } catch (error) {
    console.error('Error retrieving contact queries: ', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.updateQueryStatus = async (req, res) => {
  const { query_id, new_status } = req.body;

  if (!query_id || !new_status) {
      return res.status(400).json({ status: 'failure', message: 'Query ID and new status are required' });
  }

  try {
      const result = await userModel.updateQueryStatus(query_id, new_status);
      return res.json(result);
  } catch (error) {
      console.error('Error updating query status:', error);
      return res.status(500).json({ status: 'failure', message: 'Internal server error' });
  }
};
