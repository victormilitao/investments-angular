import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { UserStocksService } from 'src/app/services/user-stocks.service'

export interface Stock {
  id: number
  name: string
  ticker_symbol: string
  suffix: string
}

export interface UserStock {
  stock: Stock
  balance: number
}

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
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.userStocks = response.user_stocks as UserStock[]
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
