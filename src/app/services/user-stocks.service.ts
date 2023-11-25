import { Injectable, OnInit } from '@angular/core'
import { ApiHttpService } from './api-http.service'
import { AuthService } from './auth.service'

@Injectable()
export class UserStocksService {
  private userId: string = '3c25558a-665b-426f-af05-f0f343a53846'
  constructor(
    private apiService: ApiHttpService,
    private authService: AuthService
  ) {
    this.userId = this.authService.userId
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
}
