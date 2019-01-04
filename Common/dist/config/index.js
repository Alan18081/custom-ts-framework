"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    rabbitmq: {
        url: 'amqp://hyjmvawo:Vdm3_ic0x1U8fVwN_3SrOwfLA72vkmAY@shark.rmq.cloudamqp.com/hyjmvawo'
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
                user: 'postgres',
                password: 'qwerty1',
                database: 'sh_users_service'
            }
        }
    },
    ProjectsService: {
        database: {
            client: 'pg',
            connection: {
                user: 'postgres',
                password: 'qwerty1',
                database: 'sh_projects_service'
            }
        }
    },
    DataService: {
        database: {
            url: 'mongodb://localhost:27017',
            database: 'data-service'
        }
    }
};
