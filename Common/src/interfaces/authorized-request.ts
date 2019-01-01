import { Request } from 'express';
import {IProject, IUser} from '../entities';

export interface AuthorizedRequest extends Request {
  user?: IUser;
}

export interface ProjectRequest extends Request {
  project?: IProject;
}