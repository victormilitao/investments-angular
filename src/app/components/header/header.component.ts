import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { IPatrimony } from 'src/app/interfaces/patrimony.interface'
import { User } from 'src/app/interfaces/user.interface'
import { AuthService } from 'src/app/services/auth.service'
import { UserStocksService } from 'src/app/services/user-stocks.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject()
  user: User | undefined
  patrimony!: IPatrimony | null
  constructor(
    private userStockService: UserStocksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setUser()
    this.observePatrimony()
  }

  setUser(): void {
    this.user = this.authService.user
  }

  observePatrimony(): void {
    this.userStockService.getPatrimony()
    this.userStockService.patrimony
      .pipe(takeUntil(this.destroy$))
      .subscribe((patrimony) => {
        this.patrimony = patrimony
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
