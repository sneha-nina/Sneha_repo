export interface User {
  id: number;
  username: string;
  password?: string; // optional for security — omit when sending data
  role: 'Admin' | 'Employee';
  name: string;
}
