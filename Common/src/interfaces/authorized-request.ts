import { Request } from 'express';
import { IUser } from '../entities';

export interface AuthorizedRequest extends Request {
  user?: IUser;
}