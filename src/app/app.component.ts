import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CoinService } from '../app/services/coin.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
  selected: string;
  coins: string[];
  portfolio: any = [
    {
      'coin': 'BTC',
      'amount': 5,
      'value': 65000,
      'profit': 6000,
      'price': 0.13,
      'change': 12
    },
    {
      'coin': 'XRP',
      'amount': 2000,
      'value': 1300,
      'profit': 200,
      'price': 0.43,
      'change': 200
    }
  ];

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private coinData: CoinService) {
    coinData.getAll().then(res => {
       this.coins = this.formatCoins(res);
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }


  private formatCoins(data: any): string[] {
    var list: string[] = [];

    for (var key in data) {
      list.push(data[key] + ' (' + key + ')');
    };

    return list;
  }
}
