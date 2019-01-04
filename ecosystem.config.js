module.exports = {
  apps : [
      {
        name: 'API',
        script: './API/src/app.ts',
        instances: 1,
        watch: true,
        max_memory_restart: '1G',
        exec_interpreter: 'ts-node',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
      {
          name: 'AuthService',
          script: './AuthService/src/app.ts',
          instances: 1,
          watch: true,
          exec_mode: 'cluster',
          exec_interpreter: 'ts-node',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
      {
          name: 'DataService',
          script: './DataService/src/app.ts',
          instances: 1,
          watch: true,
          exec_mode: 'cluster',
          exec_interpreter: 'ts-node',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
      {
          name: 'ProjectsService',
          script: './ProjectsService/src/app.ts',
          instances: 1,
          watch: true,
          exec_mode: 'cluster',
          exec_interpreter: 'ts-node',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
      {
          name: 'UsersService',
          script: './UsersService/src/app.ts',
          instances: 1,
          watch: true,
          exec_mode: 'cluster',
          exec_interpreter: 'ts-node',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
      {
          name: 'PaymentsService',
          script: './PaymentsService/src/app.ts',
          instances: 1,
          watch: true,
          exec_mode: 'cluster',
          exec_interpreter: 'ts-node',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },

      // {
      //     name: 'API',
      //     cwd: './API',
      //     script: 'npm',
      //     args: "run dev",
      //     instances: 1,
      //     max_memory_restart: '1G',
      //     merge_logs: true,
      //     autorestart: false,
      //     exec_mode: 'fork',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },
      // {
      //     name: 'AuthService',
      //     cwd: './AuthService',
      //     script: 'npm',
      //     args: "run dev",
      //     instances: 1,
      //     merge_logs: true,
      //     autorestart: false,
      //     exec_mode: 'fork',
      //     max_memory_restart: '1G',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },
      // {
      //     name: 'DataService',
      //     cwd: './DataService',
      //     script: 'npm',
      //     args: 'run dev',
      //     instances: 1,
      //     merge_logs: true,
      //     autorestart: false,
      //     exec_mode: 'fork',
      //     max_memory_restart: '1G',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },
      // {
      //     name: 'ProjectsService',
      //     cwd: './ProjectsService',
      //     script: 'npm',
      //     args: 'run dev',
      //     instances: 1,
      //     merge_logs: true,
      //     autorestart: false,
      //     exec_mode: 'fork',
      //     max_memory_restart: '1G',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },
      // {
      //     name: 'UsersService',
      //     cwd: './UsersService',
      //     script: 'npm',
      //     args: 'run dev',
      //     instances: 1,
      //     merge_logs: true,
      //     exec_mode: 'fork',
      //     max_memory_restart: '1G',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },
      // {
      //     name: 'PaymentsService',
      //     cwd: './PaymentsService',
      //     script: 'npm',
      //     args: 'run dev',
      //     instances: 1,
      //     merge_logs: true,
      //     autorestart: false,
      //     exec_mode: 'fork',
      //     max_memory_restart: '1G',
      //     env: {
      //         NODE_ENV: 'development'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production'
      //     }
      // },

  ],
};
