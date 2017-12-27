import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CoinService } from '../app/services/coin.service';
import { EditMode } from '../app/editmode';
import { Transaction } from '../app/services/transaction';
import { PortfolioService } from '../app/services/portfolio.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly TransactionName = new Map<number, string>([
    [ EditMode.buy, 'Buy'],
    [ EditMode.edit, 'Edit'],
    [ EditMode.sell, 'Sell']
  ]);

  transaction: Transaction;
  editmode = EditMode;
  selected: string;
  coins: string[];

  portfolio: Transaction[];

   public modalRef: BsModalRef;

    constructor(private modalService: BsModalService,
      private coinService: CoinService,
      private portfolioService: PortfolioService) {

      this.transaction = new Transaction();
    coinService.getAll().then(res => {
       this.coins = this.formatCoins(res);
    });

    portfolioService.getAll().then(res => {
      this.portfolio = res;
    });

  }

  public openModal(template: TemplateRef<any>, action: EditMode) {
    this.transaction.date = new Date();
    this.modalRef = this.modalService.show(template);
  }

  public saveTransaction() {
    console.log(this.transaction);
    this.modalRef.hide();
  }

  private formatCoins(data: any): string[] {
    let list: string[] = [];

    for (var key in data) {
      list.push(data[key] + ' (' + key + ')');
    };

    return list;
  }
}
