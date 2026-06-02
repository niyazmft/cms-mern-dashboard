module.exports = {
  apps: [
    {
      name: 'cms-backend',
      script: './index.js',
      cwd: './server',
      watch: true,
      ignore_watch: ['node_modules', 'logs', '.git'],
      watch_options: {
        followSymlinks: false
      },
      max_restarts: 10,
      restart_delay: 1000,
      env: {
        NODE_ENV: 'development',
        MONGO_PORT: 5002
      },
      env_production: {
        NODE_ENV: 'production',
      },
      log_file: './logs/backend-combined.log',
      out_file: './logs/backend-out.log',
      error_file: './logs/backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    },
    {
      name: 'cms-frontend',
      script: 'node_modules/react-scripts/bin/react-scripts.js',
      args: 'start',
      cwd: './client',
      watch: false,
      max_restarts: 3,
      restart_delay: 5000,
      min_uptime: '30s',
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
        BROWSER: 'none',
        FAST_REFRESH: 'false',
        // Performance optimizations for external drive
        TSC_COMPILE_ON_ERROR: 'true',
        INLINE_RUNTIME_CHUNK: 'false'
      },
      env_production: {
        NODE_ENV: 'production',
      },
      log_file: './logs/frontend-combined.log',
      out_file: './logs/frontend-out.log',
      error_file: './logs/frontend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    }
  ]
};
