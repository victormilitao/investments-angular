import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Api {
  path:string, 
  method:HttpMethod, 
  params?:any,
  body?: any,
  headers?:Header,
  apiVersion?:string
}
export interface Header{
  [key:string]:string
};
export type HttpMethod = 'POST' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable()
export class ApiHttpService {
  url: string = environment.investmentsApi

  constructor(private http: HttpClient) { }

  public get(path: string, params?: any) {
    return this.Request({
      method: "GET",
      params: params,
      path: path,
    });
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }

  private Request(api: Api): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.request<any>(api.method, this.url + api.path, {
      body: api.body,
      params: api.params,
      // headers: headers,
      responseType: "json",
    });
  }
}