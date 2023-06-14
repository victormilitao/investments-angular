import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

@Injectable()
export class UserStocksService {
  constructor(private apiService: ApiHttpService) { }

  public get() {
    const userId = "5935d623-ba15-4f1c-b9f7-ca1a0deca4f2"
    return this.apiService.get(`api/v1/users/${userId}/stocks?page=1&limit=50`);
  }
}