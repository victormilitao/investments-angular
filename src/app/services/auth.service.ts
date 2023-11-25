import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId!: string

  constructor() {
    const userId = localStorage.getItem('userId')
    if (userId) this.userId = userId
  }
}
