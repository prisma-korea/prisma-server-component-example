const express = require('express');
const path = require('path');
const React = require('react');
const {readFileSync} = require('fs');
const {pipeToNodeWritable} = require('react-server-dom-webpack/writer');
const {waitForWebpack} = require('./helpers.server');
const Home = require('../src/components/Home.server').default;
const PostList = require('../src/components/PostList.server').default;
const PostDetails = require('../src/components/PostDetails.server').default;
const NewPost = require('../src/components/NewPost.client').default;

const router = express.Router();

async function renderReactTree(res, component, props) {
  await waitForWebpack();
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  pipeToNodeWritable(React.createElement(component, props), res, moduleMap);
}

function sendResponse(req, res, component, props = null) {
  props = props ?? {};
  renderReactTree(res, component, props);
}

router.get('/', function(req, res) {
  sendResponse(req, res, Home);
});

router.get('/posts', (req, res) => {
  sendResponse(req, res, PostList);
});

router.get('/posts/:id', (req, res) => {
  sendResponse(req, res, PostDetails, {id: req.params.id});
});

router.get('/new-post', (req, res) => {
  sendResponse(req, res, NewPost);
});

module.exports = router;
