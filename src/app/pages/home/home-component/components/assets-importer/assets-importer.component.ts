import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { UserStocksService } from 'src/app/services/user-stocks.service'

@Component({
  selector: 'assets-importer',
  templateUrl: './assets-importer.component.html',
  styleUrls: ['./assets-importer.component.scss'],
})
export class AssetsImporterComponent implements OnDestroy {
  file!: File
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private userStockService: UserStocksService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0]
    const formData = new FormData()
    formData.append('document', this.file, this.file.name)
    this.userStockService
      .importStocks(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.userStockService.getPatrimony()
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
