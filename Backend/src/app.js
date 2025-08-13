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
app.use(cors({
  origin: process.env.CLIENT_URL, // Use environment variable or default to localhost
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,// Allow cookies to be sent with requests
}))

console.log('Client URL:',process.env.CLIENT_URL)
console.log('Secret Key:',process.env.SECRET_KEY)
console.log('Mongo URI:',process.env.MONGO_URL)
console.log('Port:',process.env.PORT)
console.log('Hash Password:',process.env.HASH_PASS)

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉')
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