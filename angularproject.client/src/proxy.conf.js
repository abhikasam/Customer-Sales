const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7245';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/author",
      "/api/book",
      "/api/auth",
      "/api/user",
      "/api/v1"
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
