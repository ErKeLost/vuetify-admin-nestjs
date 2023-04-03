export class CreateUserDto {}

export interface IUserQuery {
  pageSize: number;
  startRow: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: number;
}
