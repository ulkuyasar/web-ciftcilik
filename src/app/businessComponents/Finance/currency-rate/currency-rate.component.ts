import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/FinanceService/currency-rate.service';
import { YilBaseJustListFromDsComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-just-list-from-ds/yil-base-just-list-from-ds.component';
import { ComboBoxComponent } from 'smart-webcomponents-angular/combobox';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})

// sadece Listeleme yapacagi icin YilBaseJustListFromDsComponent den turetildi
export class CurrencyRateComponent  implements AfterViewInit, OnInit {

  yildatafields : any[] =[];
  yilcolumns : any[] =[];
  yildata:any[]=[];
  currencyRateService : CurrencyRateService;

  @ViewChild('base', { static: false }) baseListComponent: YilBaseJustListFromDsComponent;
  @ViewChild('combobox', { read: ComboBoxComponent, static: false }) combobox: ComboBoxComponent;

  
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

    this.currencyRateService.getListDailyRates("").subscribe(
    data_ =>
    {        
        this.yildata = data_.data;  
        this.baseListComponent.refresh(this.yildata);

        
    });
   }


    ngOnInit(): void {
      // onInit code.
    }
  
   ngAfterViewInit(): void {
    this.init();
    }
    	
	init(): void {
    var rateService = this.currencyRateService;
    var grid = this.baseListComponent;
		this.combobox.addEventListener('change', function (event) { 
     var selectedRateCode =  this._currentSelection[0];
     rateService.getlistbyCode(selectedRateCode).subscribe(
      data_ =>
      {        
          this.yildata = data_.data;  
          grid.refresh(this.yildata);
      });
   
    });
	    

	}

}

