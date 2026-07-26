const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'API running on port ' + PORT });
});

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const referenceRoutes = require('./routes/referenceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/references', referenceRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
