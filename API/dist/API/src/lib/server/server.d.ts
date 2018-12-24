import 'reflect-metadata';
export declare class Server {
    private readonly port;
    private readonly app;
    constructor(port: number);
    run(): void;
    private registerControllers;
    private createHandler;
    private createArgs;
    private createGuardsMiddleware;
}
