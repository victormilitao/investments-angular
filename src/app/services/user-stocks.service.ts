import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

@Injectable()
export class UserStocksService {
  constructor(private apiService: ApiHttpService) { }

  public get() {
    return this.apiService.get("api/v1/users/3c757c5a-540d-4e6b-b933-020dac166772/user_stocks?page=1&limit=50");
  }
}