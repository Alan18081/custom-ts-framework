import {injectable} from 'inversify';

@injectable()
export class TokensService {

    async generateToken(): Promise<string> {
        return 'Hello';
    }

}