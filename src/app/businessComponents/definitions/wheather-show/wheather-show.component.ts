import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { WheatherService } from 'src/app/services/definition/wheather.service';
import { WheatherHeaderAndDetailDTO, WheatherGeneralDTO, WheatherGeneralDailyDTO, WheatherBaseDTO, WheatherDetaillDTO } from 'src/app/_entityDTOs/entityDefinitionDTOs';
import { CardViewComponent, Smart } from 'smart-webcomponents-angular/cardview';
import { formatDate } from '@angular/common';
import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
import { UserTarlaService } from 'src/app/services/CRM/user-tarla.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { UserTarla } from 'src/app/_entities/entitiesforCRM';

@Component({
  selector: 'app-wheather-show',
  templateUrl: './wheather-show.component.html',
  styleUrls: ['./wheather-show.component.css']
})
export class WheatherShowComponent implements AfterViewInit,OnInit {

  wheatherService:WheatherService;
  tarlaService:UserTarlaService;
  authenticationService:AuthenticationService;
  data : WheatherHeaderAndDetailDTO[];
  userTarlas : UserTarla[];
  @ViewChild('cardViewTodayWheather', { read: CardViewComponent, static: false }) cardViewTodayWheather: CardViewComponent;
  @ViewChild('cardViewDailyWheather', { read: CardViewComponent, static: false }) cardViewDailyWheather: CardViewComponent;
  @ViewChild('cmbTarlaList', { static: false }) cmbTarlaList: YilComboboxViaDatasourceComponent;

  setValues : string[];
  constructor(private _wheatherService:WheatherService,
              private _tarlaService:UserTarlaService,
              private _authenticationService:AuthenticationService) 
    {
        this.setValues = [];
        this.wheatherService = _wheatherService;
        this.tarlaService = _tarlaService;
        this.authenticationService = _authenticationService;
    }

    init(): void {
		this.tarlaService.getlistbyotherobject(this.authenticationService.currentlyUserId()).subscribe(
            data_ =>
            {
                this.userTarlas = data_.data;
                this.cmbTarlaList.refreshViaListIdName(this.userTarlas);
                
                if (this.userTarlas!=null && this.userTarlas.length > 0){
                    this.setValues.push( this.userTarlas[0].id+"");
                    this.cmbTarlaList.setSelectedValues(this.setValues);
                }
                
            });
	}	

   refreshWithTarlaId(tarlaId:number){
      this.wheatherService.getWithTarlaId(tarlaId).subscribe(
        data_ =>
        {
            this.data = data_.data;
            let resultToday = this.generateTodayDataForCardView(this.data);
            let resultDaily = this.generateDailyDataForCardView(this.data);
 
            this.refreshForToday(resultToday);
            this.refreshForDaily(resultDaily);
        }
       );
   }


   cmbTarlaListChangeValue($event):void{
        var selectedValue =  this.cmbTarlaList.getSelectedValues();
        this.refreshWithTarlaId(+selectedValue);
   }

  generateTodayDataForCardView(wheathers: WheatherHeaderAndDetailDTO[]): any[]{
    const sampleData = [];
    if (wheathers==null)
      return sampleData;

    let addingCount = 0;
    for (let i = 0; i < wheathers.length; i++) {
        const rowcurrent: any = this.prepareForCardFromWheatherDTOObhect(wheathers[i].current);
        sampleData[addingCount] = rowcurrent;
        addingCount++;

        if (wheathers[i].todayMorning !=null){
            const rowMorning: any = this.prepareForCardFromWheatherDTOObhect(wheathers[i].todayMorning);
            sampleData[addingCount] = rowMorning;
            addingCount++;
        }

        if (wheathers[i].todayOglen !=null){
            const rowOglen: any = this.prepareForCardFromWheatherDTOObhect(wheathers[i].todayOglen);
            sampleData[addingCount] = rowOglen;
            addingCount++;
        }

        if (wheathers[i].todayAksam !=null){
            const rowAksam: any = this.prepareForCardFromWheatherDTOObhect(wheathers[i].todayAksam);
            sampleData[addingCount] = rowAksam;
            addingCount++;
        }

        if (wheathers[i].todayGece !=null){
            const rowGece: any = this.prepareForCardFromWheatherDTOObhect(wheathers[i].todayGece);
            sampleData[addingCount] = rowGece;
            addingCount++;
        }
    }    
    return sampleData;
  }

  generateDailyDataForCardView(wheathers: WheatherHeaderAndDetailDTO[]): any[]{
    const sampleData = [];
    if (wheathers==null)
      return sampleData;

    let addingCount = 0;
    for (let i = 0; i < wheathers.length; i++) {
        const dailyDatas : WheatherGeneralDailyDTO[] = wheathers[i].daily;

        if (dailyDatas[0] !=null){
            const rowMorning: any = this.prepareForCardFromWheatherDTOObhect(dailyDatas[0] );
            sampleData[addingCount] = rowMorning;
            addingCount++;
        }

        if (dailyDatas[1] !=null){
            const rowOglen: any = this.prepareForCardFromWheatherDTOObhect(dailyDatas[1]);
            sampleData[addingCount] = rowOglen;
            addingCount++;
        }

        if (dailyDatas[2]){
            const rowAksam: any = this.prepareForCardFromWheatherDTOObhect(dailyDatas[2]);
            sampleData[addingCount] = rowAksam;
            addingCount++;
        }

        if (dailyDatas[3]){
            const rowGece: any = this.prepareForCardFromWheatherDTOObhect(dailyDatas[3]);
            sampleData[addingCount] = rowGece;
            addingCount++;
        }
    }    
    return sampleData;
  }







  prepareForCardFromWheatherDTOObhect(wheather:any):any[]{
        const row: any = {}; 

        row.temp = wheather.tempCelcius;
        row.feels_like = wheather.feels_likeCelcius;
        row.clouds = wheather.clouds;
        row.dew_point = wheather.dew_point;
        row.humidity = wheather.humidity;
        row.pressure = wheather.pressure;
        row.wind_deg = wheather.wind_deg;
        row.wind_speed = wheather.wind_speed;
        //row.visibility = currentWheather.visibility;
        row.zaman = wheather.zamanStr; 

        row.attachments = [];
        const maxAttachments : string[] =[];
        for (let i = 0; i < wheather.weather.length; i++) {
            //const wheatherDetaillDTO : WheatherDetaillDTO = maxAttachments[i];
            row.attachments.push(`http://openweathermap.org/img/wn/${wheather.weather[i].icon}@2x.png`);
            //row.attachments.push(`../../../images/travel/${Math.floor(Math.random() * 36) + 1}.jpg`);
            
        }
        row.attachments = row.attachments.join(',');
        return row; 
   }


    
    // generateData(length: number): any[] {
    //     const sampleData = [], firstNames = ['Andrew', 'Nancy', 'Shelley', 'Regina', 'Yoshi', 'Antoni', 'Mayumi', 'Ian', 'Peter', 'Lars', 'Petra', 'Martin', 'Sven', 'Elio', 'Beate', 'Cheryl', 'Michael', 'Guylene'], lastNames = ['Fuller', 'Davolio', 'Burke', 'Murphy', 'Nagase', 'Saavedra', 'Ohno', 'Devling', 'Wilson', 'Peterson', 'Winkler', 'Bein', 'Petersen', 'Rossi', 'Vileid', 'Saylor', 'Bjorn', 'Nodier'], petNames = ['Sam', 'Bob', 'Lucky', 'Tommy', 'Charlie', 'Olliver', 'Mixie', 'Fluffy', 'Acorn', 'Beak'], countries = ['Bulgaria', 'USA', 'UK', 'Singapore', 'Thailand', 'Russia', 'China', 'Belize'], productNames = ['Black Tea', 'Green Tea', 'Caffe Espresso', 'Doubleshot Espresso', 'Caffe Latte', 'White Chocolate Mocha', 'Cramel Latte', 'Caffe Americano', 'Cappuccino', 'Espresso Truffle', 'Espresso con Panna', 'Peppermint Mocha Twist'];
    //     for (let i = 0; i < length; i++) {
    //         const row: any = {};
       
    //         row.firstName = (i + 1) + '. ' + firstNames[Math.floor(Math.random() * firstNames.length)];
    //         row.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    //         row.birthday = new Date(Math.round(Math.random() * (2018 - 1918) + 1918), Math.round(Math.random() * 11), Math.round(Math.random() * (31 - 1) + 1));
    //         row.petName = petNames[Math.floor(Math.random() * petNames.length)];
    //         row.country = countries[Math.floor(Math.random() * countries.length)];
    //         row.productName = productNames[Math.floor(Math.random() * productNames.length)];
    //         row.price = parseFloat((Math.random() * (100 - 0.5) + 0.5).toFixed(2));
    //         row.quantity = Math.round(Math.random() * (50 - 1) + 1);
    //         row.timeOfPurchase = new Date(2019, 0, 1, Math.round(Math.random() * 23), Math.round(Math.random() * (31 - 1) + 1));
    //         row.expired = Math.random() >= 0.5;
    //         row.attachments = [];
    //         const maxAttachments = Math.floor(Math.random() * Math.floor(3)) + 1;
    //         for (let i = 0; i < maxAttachments; i++) {
    //             row.attachments.push(`../../../images/travel/${Math.floor(Math.random() * 36) + 1}.jpg`);
    //         }
    //         row.attachments = row.attachments.join(',');
    //         sampleData[i] = row;
    //     }
        
    //     return sampleData;
    // }


    dataSourceTodayWheather = new Smart.DataAdapter({
        dataSource:  this.generateTodayDataForCardView(null), // this.generateData(50),
        dataFields: [
           
        ]
    });

    dataSourceToDailyWheather = new Smart.DataAdapter({
        dataSource:  this.generateDailyDataForCardView(null), // this.generateData(50),
        dataFields: [
           
        ]
    });

    refreshForToday(data: any[]){
        this.dataSourceTodayWheather = new Smart.DataAdapter({
            dataSource: data,
            dataFields: [
                'zaman: string',
                'temp: number',
                'feels_like: number',           
                'clouds: number',
                'dew_point: number',
                'humidity: number',
                'pressure: number',
                'uvi: number',
                'wind_deg: number',
                'wind_speed: number',              
                'attachments: string'
            ]
        });
    } 

    refreshForDaily(data: any[]){
        this.dataSourceToDailyWheather = new Smart.DataAdapter({
            dataSource: data,
            dataFields: [
                'zaman: string',
                'temp: number',
                'feels_like: number',           
                'clouds: number',
                'dew_point: number',
                'humidity: number',
                'pressure: number',
                'uvi: number',
                'wind_deg: number',
                'wind_speed: number',
                'attachments: string'
            ]
        });
    }



    columns = [
        { label: 'Zaman', dataField: 'zaman', icon: 'birthday'  },
        { label: 'Hava Sıcakliği', dataField: 'temp', icon: 'firstName' },
        { label: 'Hissedilen Sıcaklık', dataField: 'feels_like', icon: 'lastName' },
        { label: 'Bulutlanma oranı', dataField: 'clouds', icon: 'birthday'},
        { label: 'Nem', dataField: 'humidity', icon: 'petName' },
        { label: 'Basınç', dataField: 'pressure', icon: 'country' },
        { label: 'UL', dataField: 'productName', icon: 'productName' },
        { label: 'Rüzgar Derecesi', dataField: 'wind_deg', icon: 'country' },
        { label: 'Rüzgar Hızı', dataField: 'wind_speed', icon: 'country' },
        





        // { label: 'Rüzgar Derecesi', dataField: 'price', icon: 'price', formatSettings: { formatString: 'c2' } },
        // {
        //     label: 'Quantity', dataField: 'quantity', icon: 'quantity', formatFunction: function (settings) {
        //         const value = settings.value;
        //         let className;
        //         if (value < 20) {
        //             className = 'red';
        //         }
        //         else if (value < 35) {
        //             className = 'yellow';
        //         }
        //         else {
        //             className = 'green';
        //         }
        //         settings.template = `<div class="${className}">${value}</div>`;
        //     }
        // },
        // { label: 'Time of Purchase', dataField: 'timeOfPurchase', icon: 'timeOfPurchase', formatSettings: { formatString: 'hh:mm tt' } },
        // {
        //     label: 'Expired', dataField: 'expired', icon: 'expired', formatFunction: function (settings) {
        //         settings.template = settings.value ? '☑' : '☐';
        //     }
        // },
        { label: 'Attachments', dataField: 'attachments', image: true }
    ];

    coverField: string = 'attachments';
    titleField: string = 'zaman'
 
	ngOnInit(): void {
		// onInit code.
	}

	ngAfterViewInit(): void {
		// afterViewInit code.
		this.init();
    }
		
	
}