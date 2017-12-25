import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CoinService {

  public apiHost: string = './assets/cryptocurrencies.json';
  constructor(private http: Http) { }
 
  public getAll(): Promise<Object> {
      return this.http.get(this.apiHost)
        .toPromise()
        .then((response) => {
          return response.json();
        }).catch((err) => {
        console.log(err);
      });
  }
}
