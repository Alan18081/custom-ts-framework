export const config = {
  rabbitmq: {
      url: 'amqp://grrmkucz:4ipXMzmjEiphGhUFt88-SAJbtqZtEjDv@bee.rmq.cloudamqp.com/grrmkucz?heartbeat=60'
  },
  common: {
      passwordLength: 4,
      jwtSecret: 'Enterprise & Endurance',
      jwtProjectSecret: 'Jupiter & Apollon',
  },
  UsersService: {
      database: {
          client: 'pg',
          connection: {
              user : 'postgres',
              password : 'qwerty1',
              database : 'sh_users_service'
          }
      }
  },
  ProjectsService: {
    database: {
        client: 'pg',
        connection: {
            user : 'postgres',
            password : 'qwerty1',
            database : 'sh_projects_service'
        }
    }
  },
  DataService: {
    database: {
        url: 'mongodb://localhost:27017',
        database: 'sh_projects_service'
    }
  }
};