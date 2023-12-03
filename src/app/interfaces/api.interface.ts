import { User } from "./user.interface"

export interface IResponseApi {
  success?: boolean
  errors?: string[]
}

export interface UserApi {
  user: User
}