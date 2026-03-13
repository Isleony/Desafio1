export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface UserProps {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export class User implements UserProps {
  id: number;
  username: string;
  email: string;
  role: UserRole;

  constructor(id: number, username: string, email: string, role: UserRole) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
