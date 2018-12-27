import { Request } from 'express';
import { User } from '../entities';

export interface AuthorizedRequest extends Request {
  user?: User;
}