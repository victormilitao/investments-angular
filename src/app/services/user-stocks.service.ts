import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

@Injectable()
export class UserStocksService {
  constructor(private apiService: ApiHttpService) { }

  public get() {
    const userId = "645c6055-b17a-4817-a24a-8592ba3e14d4"
    return this.apiService.get("api/v1/users/${userId}/stocks?page=1&limit=50");
  }
}