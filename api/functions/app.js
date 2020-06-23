/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const nocache = require('nocache');
const ForgeSDK = require('@arcblock/forge-sdk');
const env = require('../libs/env');

const isProduction = process.env.NODE_ENV === 'production';
const isNetlify = process.env.NETLIFY && JSON.parse(process.env.NETLIFY);

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
let isConnectedBefore = false;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...');
  if (!isConnectedBefore) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
  }
});
mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  console.log('Connection established to MongoDB');
});
mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB');
});

// connect to chain
ForgeSDK.connect(env.chainHost, { chainId: env.chainId, name: env.chainId, default: true });

// Create and config express application
const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(bodyParser.json({ limit: '1 mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());

const router = express.Router();

require('../routes/orders').init(router);

// ------------------------------------------------------
// This is required by netlify functions
// ------------------------------------------------------
if (isProduction) {
  if (isNetlify) {
    app.use('/.netlify/functions/app', router);
  } else {
    app.use(compression());
    app.use(router);
    app.use(
      express.static(path.resolve(__dirname, '../../build'), { maxAge: '365d', index: false })
    );
    app.get('*', nocache(), (req, res) => {
      res.send(fs.readFileSync(path.resolve(__dirname, '../../build/index.html')).toString());
    });
  }
  app.use((req, res) => {
    res.status(404).send('404 NOT FOUND');
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
} else {
  app.use(router);
}

// Make it serverless
exports.handler = serverless(app);
exports.server = server;
