import { User } from '../../../helpers/interfaces/user.interface';
export interface JwtResponse {
    token: string;
    user: User;
}
