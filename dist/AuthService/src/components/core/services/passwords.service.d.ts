export declare class PasswordsService {
    private readonly ROUNDS;
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
