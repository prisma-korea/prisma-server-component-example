const path = require('path');
const {readFileSync} = require('fs');
/**
 * Async express request handler.
 * @param {import('express').RequestHandler} fn
 * @returns wrapped handler.
 */
exports.handleErrors = (fn) => {
  return async function(req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
};

exports.waitForWebpack = async () => {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/index.html'));
      return;
    } catch (err) {
      console.log(
        'Could not find webpack build output. Will retry in a second...'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
