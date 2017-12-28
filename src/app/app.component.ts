import { Component, TemplateRef, ViewChild, transition } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CoinService } from '../app/services/coin.service';
import { EditMode } from '../app/editmode';
import { Transaction, Position } from '../app/services/transaction';
import { PortfolioService } from '../app/services/portfolio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NumberValidators } from '../app/helpers/numberValidators';

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

  editmode = EditMode;
  transaction: Transaction;
  selected: string;
  coins: string[];
  form: FormGroup;
  formSubmitted: boolean;
  isEditing: boolean;

  portfolio: Position[];

   public modalRef: BsModalRef;

    constructor(private modalService: BsModalService,
      private coinService: CoinService,
      private portfolioService: PortfolioService,
      private formBuilder: FormBuilder) {

    coinService.getAll().then(res => {
       this.coins = this.formatCoins(res);
    });

    portfolioService.getAll().then(res => {
      this.portfolio = res;
    });

  }

  public openModal(template: TemplateRef<any>, action: EditMode, id?: number) {
    this.isEditing = action === EditMode.edit;
    if (action === EditMode.edit) {
      // Fill in values.
      this.transaction = this.portfolio.find(x => x.id === id);

    } else {
      this.transaction = new Transaction();
      this.transaction.date = new Date();
    }

    this.form = this.formBuilder.group({
      transactiontype: [true, Validators.required],
      coin: [this.transaction.coin, Validators.required],
      amount: [this.transaction.amount, [Validators.required, NumberValidators.isNumber()]],
      price: [this.transaction.price, [Validators.required, NumberValidators.isNumber()]],
      date: [this.transaction.date]
    });

    this.modalRef = this.modalService.show(template);
  }

  public submitForm(form: any) {
    this.formSubmitted = true;

    if (form.valid) {
      this.transaction.buy = form.value.transactiontype;
      this.transaction.coin = this.getCoinTicker(form.value.coin);
      this.transaction.amount = form.value.amount;
      this.transaction.price = form.value.price;
      this.transaction.date = form.value.date;

      if (this.isEditing) {
        this.portfolioService.updatePosition(this.transaction);
      } else {
        this.portfolioService.addTransaction(this.transaction);
      }

      this.modalRef.hide();
      this.formSubmitted = false;
    }
  }

  private getCoinTicker(coin: string): string {
    const regex = /\((.*)\)/g;
    let match;
    if ((match = regex.exec(coin)) !== null) {
      return match[1];
    }
    return coin;
  }

  private formatCoins(data: any): string[] {
    const list: string[] = [];

    for (const key of Object.keys(data)) {
      list.push(data[key] + ' (' + key + ')');
    }

    return list;
  }
}
