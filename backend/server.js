require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const aiHubRoutes = require('./routes/aiHubRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: [process.env.FRONTEND_URL || 'http://localhost:5173'], credentials: true }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiHubRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => console.log('Backend running on port 5000'));
  })
  .catch((err) => console.error('DB Error:', err));