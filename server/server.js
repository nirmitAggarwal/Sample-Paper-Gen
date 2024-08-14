const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.REACT_APP_CLIENT_ID);