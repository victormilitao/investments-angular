import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { UserStock } from 'src/app/interfaces/user.interface'
import { UserStocksService } from 'src/app/services/user-stocks.service'

@Component({
  selector: 'app-user-stocks',
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.scss'],
})
export class UserStocksComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()
  userStocks: UserStock[] = []

  constructor(private userStocksService: UserStocksService) {}

  ngOnInit() {
    this.setUserStocks()
  }

  setUserStocks(): void {
    this.userStocksService
      .getUserStocks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.userStocks = response.user_stocks))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
