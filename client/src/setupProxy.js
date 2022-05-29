const { createProxyMiddleware } = require('http-proxy-middleware');

// src/setupProxy.js
module.exports = function(app) {
    app.use('/api/data', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
    app.use('/kakao', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
    app.use('/db', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
    app.use('/session', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
    app.use('/recommend', 
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
};