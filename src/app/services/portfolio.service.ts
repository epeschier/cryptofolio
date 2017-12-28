import { Injectable, transition } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Position, Transaction } from './transaction';
import { tr } from 'ngx-bootstrap/bs-moment/i18n/tr';


@Injectable()
export class PortfolioService {

  portfolio: Position[];

  constructor(private http: Http) {
    this.portfolio = [];
  }

  public getAll(): Promise<Position[]> {
    // Temp data
    this.portfolio.push(new Position('BTC', 5, 0.13, 0.15));
    this.portfolio.push(new Position('XRP', 2000, 0.43, 0.33));
    this.portfolio[0].id = 1;
    this.portfolio[0].date = new Date();
    this.portfolio[1].id = 2;
    this.portfolio[1].date = new Date();
    const p = Promise.resolve(this.portfolio);
    return p;
  }

  public addTransaction(transaction: Transaction) {
    const pos = new Position(transaction.coin, transaction.amount, transaction.price);
    pos.id = this.portfolio.length + 1;
    this.portfolio.push(pos);
  }

  public updatePosition(transaction: Transaction) {

  }
}
