import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Position, Transaction } from './transaction';


@Injectable()
export class PortfolioService {

  portfolio: Transaction[];
  
  constructor(private http: Http) { 
    this.portfolio = [];
    this.portfolio.push(new Position('BTC', 5, 0.13, 0.15));
    this.portfolio.push(new Position('XRP', 2000, 0.43, 0.33));
    //'date': "2017-11-22T18:25:43.511Z"
  }

  public getAll(): Promise<Transaction[]> {
    var p = Promise.resolve(this.portfolio);
    return p;
  }

  public addTransaction() {

  }

  public editTransaction() {

  }
}
