const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes=require('./routes/bookRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/book',bookRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
