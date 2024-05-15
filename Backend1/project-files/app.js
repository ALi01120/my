const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router: authRouter } = require('./AuthModels/auth');
const { router: adminRouter } = require('./AdminModels/AdminModel');
const userRouter = require('./userModels/jobs'); // Import jobs router
const jobRouter = require('./userModels/jobSeeker');
const CreateCourseRouter =require('./userModels/auction');
const MessagesRoute = require('./userModels/messeges');
const contectRoute = require('./userModels/contact');
const notificationRoute = require('./userModels/notificationController');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/', userRouter); // Mount jobs router under /api/jobs route
app.use('/', jobRouter);
app.use('/', CreateCourseRouter );
app.use('/',MessagesRoute);
app.use('/', contectRoute);
app.use('/',notificationRoute);
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

/// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
