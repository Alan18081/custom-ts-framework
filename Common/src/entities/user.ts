export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  positionId?: number;
  password: string;
}