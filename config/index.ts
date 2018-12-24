export const config = {
  rabbitmq: {
      url: 'amqp://grrmkucz:4ipXMzmjEiphGhUFt88-SAJbtqZtEjDv@bee.rmq.cloudamqp.com/grrmkucz?heartbeat=60'
  },
  common: {
      passwordLength: 4
  },
  UsersService: {
      database: {
          client: 'pg',
          connection: {
              user : 'postgres',
              password : 'qwerty1',
              database : 'spaceships_service'
          }
      }
  }
};