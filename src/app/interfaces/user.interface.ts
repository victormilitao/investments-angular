import { Stock } from "./stock.interface"

export interface User {
  id?: string
  email?: string
  name?: string
  password?: string
  created_at?: string
  updated_at?: string
}

export interface UserStock {
  stock: Stock
  balance: number
}