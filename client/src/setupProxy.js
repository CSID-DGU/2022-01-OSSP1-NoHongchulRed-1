const { createProxyMiddleware } = require('http-proxy-middleware');

// src/setupProxy.js
module.exports = function(app) {
    app.use('/api/data', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
};