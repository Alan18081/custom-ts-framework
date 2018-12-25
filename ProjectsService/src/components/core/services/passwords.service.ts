import {injectable} from 'inversify';
import * as bcrypt from 'bcrypt';

@injectable()
export class PasswordsService {

    private readonly ROUNDS = 10;

    async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.ROUNDS);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}