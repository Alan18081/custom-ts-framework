export declare const config: {
    rabbitmq: {
        url: string;
    };
    common: {
        passwordLength: number;
        jwtSecret: string;
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
    };
    DataService: {
        database: {
            url: string;
            database: string;
        };
    };
};
