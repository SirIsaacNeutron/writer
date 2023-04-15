const { createProxyMiddleware } = require('http-proxy-middleware');

const url = process.env.PORT
  ? `http://localhost:${process.env.PORT}`
  : "http://localhost:4000";

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};
