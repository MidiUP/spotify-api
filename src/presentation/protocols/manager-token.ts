export interface ManagerToken{
  generateToken: (data: Object) => Promise<string>
  validateToken: (token: string) => Promise<boolean>
}
