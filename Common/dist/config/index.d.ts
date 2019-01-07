export declare const config: {
    rabbitmq: {
        url: string;
    };
    common: {
        passwordLength: number;
        jwtSecret: string;
        jwtProjectSecret: string;
    };
    UsersService: {
        database: {
            client: string;
            connection: {
                user: string;
                password: string;
                database: string;
            };
        };
        redis: {
            host: string;
            port: number;
            db: number;
        };
    };
    ProjectsService: {
        database: {
            client: string;
            connection: {
                user: string;
                password: string;
                database: string;
            };
        };
        redis: {
            host: string;
            port: number;
            db: number;
        };
    };
    DataService: {
        database: {
            url: string;
            database: string;
        };
        redis: {
            host: string;
            port: number;
            db: number;
        };
    };
};
