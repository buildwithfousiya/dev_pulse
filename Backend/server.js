const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});