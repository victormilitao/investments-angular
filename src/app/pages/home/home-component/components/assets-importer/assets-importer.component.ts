import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { UserStocksService } from 'src/app/services/user-stocks.service'

@Component({
  selector: 'assets-importer',
  templateUrl: './assets-importer.component.html',
  styleUrls: ['./assets-importer.component.scss'],
})
export class AssetsImporterComponent {
  file!: File

  constructor(private userStockService: UserStocksService, private http: HttpClient) { }

  onFileSelected(event: any): void {
    this.file = event.target.files[0]
    const formData = new FormData()
    formData.append('document', this.file, this.file.name)
    this.userStockService.importStocks(formData)
    .subscribe((response) => {
      console.dir(response)
    })
  }
}
