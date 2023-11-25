import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { ApiHttpService } from './api-http.service'
import { AuthService } from './auth.service'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { IPatrimony } from '../interfaces/patrimony.interface'

@Injectable()
export class UserStocksService implements OnDestroy {
  private userId: string | undefined = '3c25558a-665b-426f-af05-f0f343a53846'
  destroy$: Subject<boolean> = new Subject()
  private patrimonySource = new BehaviorSubject<IPatrimony | null>(null)
  patrimony: Observable<IPatrimony | null> = this.patrimonySource.asObservable()

  constructor(
    private apiService: ApiHttpService,
    private authService: AuthService
  ) {
    this.userId = this.authService.user?.id
  }

  get() {
    return this.apiService.get(
      `api/v1/users/${this.userId}/stocks?page=1&limit=50`
    )
  }

  importStocks(formData: any) {
    return this.apiService.post(
      `api/v1/users/${this.userId}/position_import`,
      formData
    )
  }

  getPatrimony() {
    return this.apiService
      .get(`api/v1/users/${this.userId}/patrimony`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: IPatrimony) => {
        this.patrimonySource.next(response)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
