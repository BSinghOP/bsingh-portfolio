module.exports = {
  apps: [
    {
      name: 'bsingh-portfolio',
      script: 'node_modules/.bin/next',
      args: 'start -H 127.0.0.1 -p 3000',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
