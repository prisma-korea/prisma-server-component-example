/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const express = require('express');
const compress = require('compression');
const {readFileSync} = require('fs');
const path = require('path');
const {handleErrors, waitForWebpack} = require('./helpers.server');
const crudRouter = require('./crud.server');
const serverComponentRouter = require('./react.server');

const PORT = 4000;
const app = express();

app.use(compress());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`React Notes listening at http://localhost:${PORT}`);
});

app.use('/react', serverComponentRouter);
app.use('/api/posts/', crudRouter);
app.use(express.static('build'));
app.use(express.static('public'));

app.get(
  '*',
  handleErrors(async function(_req, res) {
    await waitForWebpack();
    const html = readFileSync(
      path.resolve(__dirname, '../build/index.html'),
      'utf8'
    );
    // Note: this is sending an empty HTML shell, like a client-side-only app.
    // However, the intended solution (which isn't built out yet) is to read
    // from the Server endpoint and turn its response into an HTML stream.
    res.send(html);
  })
);

app.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
