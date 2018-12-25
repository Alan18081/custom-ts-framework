interface ModuleConfig {
    imports?: any[];
    services?: any[];
    controllers?: any[];
    exports?: any[];
    handlers?: any[];
}
export declare function Module(config: ModuleConfig): (target: any) => void;
export {};
