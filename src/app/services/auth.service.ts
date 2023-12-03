import { Injectable, OnDestroy } from '@angular/core'
import { User } from '../interfaces/user.interface'
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs'
import { ApiHttpService } from './api-http.service'
import { UserApi } from '../interfaces/api.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject()
  user!: User | undefined
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser$: Observable<User | null>

  constructor(private apiService: ApiHttpService) {
    this.setUser()
  }

  private setUser(): void {
    const storedUser = localStorage.getItem('user')
    const user: User | null = storedUser ? JSON.parse(storedUser) : null
    if (user) user.id = '3c25558a-665b-426f-af05-f0f343a53846'
    this.currentUserSubject = new BehaviorSubject(user)
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  currentUser(): User | null {
    return this.currentUserSubject.value
  }

  signup(formData: UserApi): Observable<UserApi> {
    return this.apiService.post(`api/v1/users`, formData).pipe(
      takeUntil(this.destroy$),
      switchMap((response: UserApi) => {
        if (response?.user) return this.signin(formData)

        return EMPTY
      }),
      catchError((error) => throwError(() => error))
    )
  }

  signin(formData: UserApi): Observable<UserApi> {
    return this.apiService.post('api/v1/user/sign_in', formData).pipe(
      takeUntil(this.destroy$),
      tap((response: UserApi) => {
        const user = response?.user
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
      }),
      catchError((error) => throwError(() => error))
    )
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUserSubject.next(null)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
