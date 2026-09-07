require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const violationRoutes = require('./routes/violationRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

const app = express();
const path = require('path');
console.log('SERVER DIR:', __dirname);
console.log('UPLOADS DIR:', path.join(__dirname, '../../uploads'));
console.log(
  'UPLOADS EXISTS:',
  require('fs').existsSync(path.join(__dirname, '../../uploads'))
);

app.use(
  '/uploads',
  express.static(path.join(__dirname, '../../uploads'))
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ishajadhav3005_db_user:LegalScanAI123@cluster0.f136nrs.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/violations', violationRoutes);
app.use('/api/manufacturers', manufacturerRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node.js API running on port ${PORT}`);
});
