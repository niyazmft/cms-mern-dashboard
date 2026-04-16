module.exports = {
  apps: [
    {
      name: 'cms-backend',
      script: 'index.js',
      cwd: './server',
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    },
    {
      name: 'cms-frontend',
      script: 'npm',
      args: 'start',
      cwd: './client',
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }
  ]
};