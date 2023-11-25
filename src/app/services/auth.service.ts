import { Injectable } from '@angular/core'
import { User } from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User | undefined

  constructor() {
    const user = localStorage.getItem('user')
    if (user) this.user = JSON.parse(user)
  }
}
