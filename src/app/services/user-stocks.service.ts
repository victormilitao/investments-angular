import { Injectable } from '@angular/core'
import { ApiHttpService } from './api-http.service'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserStocksService {
  private userId = '3c25558a-665b-426f-af05-f0f343a53846'
  constructor(private apiService: ApiHttpService, private http: HttpClient) {}

  public get() {
    return this.apiService.get(
      `api/v1/users/${this.userId}/stocks?page=1&limit=50`
    )
  }

  public importStocks(formData: any) {
    const url = 'https://investment-api-3vvw.onrender.com/api/v1/users/3c25558a-665b-426f-af05-f0f343a53846/position_import'
    return this.http.request<any>('POST', url, { body: formData })
  }
}
