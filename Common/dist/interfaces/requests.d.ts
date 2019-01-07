import { Request } from 'express';
import { IProject, IProjectAccount, IUser } from '../entities';
export interface AuthRequest extends Request {
    user?: IUser;
}
export interface ProjectRequest extends Request {
    project?: IProject;
}
export interface ProjectAccountRequest extends Request {
    projectAccount?: IProjectAccount;
}
