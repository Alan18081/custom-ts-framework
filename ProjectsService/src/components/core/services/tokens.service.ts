import {injectable} from 'inversify';

@injectable()
export class TokensService {

    generateToken(): Promise<string> {}

}