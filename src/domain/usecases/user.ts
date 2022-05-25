export interface CreateUser{
  name: string
  email: string
  password: string
}

export interface UserDto{
  id: number
  name: string
  email: string
}
export interface UserLogin{
  email: string
  password: string
  id: number
}
