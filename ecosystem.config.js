module.exports = {
  apps: [
    {
      name: 'cms-backend',
      script: 'npm',
      args: 'run dev',
      cwd: './server',
      instance_var: 'INSTANCE_ID',
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
      instance_var: 'INSTANCE_ID',
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