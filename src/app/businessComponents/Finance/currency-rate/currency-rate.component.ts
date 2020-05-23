import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/FinanceService/currency-rate.service';
import { YilBaseJustListFromDsComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-just-list-from-ds/yil-base-just-list-from-ds.component';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})

// sadece Listeleme yapacagi icin YilBaseJustListFromDsComponent den turetildi
export class CurrencyRateComponent  implements AfterViewInit {

  private yildatafields : any[] =[];
  private yilcolumns : any[] =[];
  private yildata:any[]=[];
  currencyRateService : CurrencyRateService;


  @ViewChild('base', { static: false }) baseListComponent: YilBaseJustListFromDsComponent;

  
  constructor(protected _currencyRateService:CurrencyRateService) {

    this.currencyRateService = _currencyRateService;
    this.yilcolumns=
    [
        { text: 'Id', datafield: 'id', width: 120 },
        { text: 'Kod', datafield: 'name', width: 120 },
        { text: 'Değeri', datafield: 'value', width: 180 },
        { text: 'Tarih', datafield: 'currencyDate', width: 180 }      
    ];

    this.yildatafields=
    [
        { name: 'id', type: 'number' },
        { name: 'name', type: 'string' },
        { name: 'value', type: 'number' },
        { name: 'currencyDate', type: 'date' }

    ];

    this.currencyRateService.getCurrencyRateByCode("").subscribe(
    data_ =>
    {        
        this.yildata = data_.data;  
        this.baseListComponent.refresh(this.yildata);
        
    });
   }
  
   ngAfterViewInit(): void {
       
    }

}

