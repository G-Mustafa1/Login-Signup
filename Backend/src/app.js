const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/database');
const { profileRouter } = require('./router/profile');
const { authRouter } = require('./router/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://login-signup-frontend-rosy.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar request Postman ya server-to-server ho, origin null hota hai, usko allow kar do
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// app.use(cors({
//   origin: process.env.CLIENT_URL, // Use environment variable or default to localhost
//   credentials: true,// Allow cookies to be sent with requests
// }))
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})
connectDB()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.error('Database connection failed', err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});      