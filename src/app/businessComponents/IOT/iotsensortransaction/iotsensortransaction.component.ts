import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { WheatherService } from 'src/app/services/definition/wheather.service';
import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
import { UserTarlaService } from 'src/app/services/CRM/user-tarla.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { UserTarla } from 'src/app/_entities/entitiesforCRM';
import { SensorTransactionDTO } from 'src/app/_entityDTOs/entityIOTTransactionDTO';
import { jqxBarGaugeComponent } from 'jqwidgets-ng/jqxbargauge';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { IotsensortransactionService } from 'src/app/services/IOT/iotsensortransaction.service';
import { YilBaseJustListFromDsComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-just-list-from-ds/yil-base-just-list-from-ds.component';
import { ToastComponent } from 'smart-webcomponents-angular/toast';

@Component({
  selector: 'app-iotsensortransaction',
  templateUrl: './iotsensortransaction.component.html',
  styleUrls: ['./iotsensortransaction.component.css']
})
export class IotsensortransactionComponent implements AfterViewInit,OnInit {

  iotSensorService:IotsensortransactionService;
  tarlaService:UserTarlaService;
  authenticationService:AuthenticationService;
  sensorData : SensorTransactionDTO[];
  userTarlas : UserTarla[];


  data: any[] = [];
  padding: any = { left: 10, top: 10, right: 10, bottom: 10 };
  titlePadding: any = { left: 0, top: 0, right: 0, bottom: 10 };

  //start of yilGrid
  yildatafields : any[] =[];
  yilcolumns : any[] =[];
  yildata:any[]=[];
  //end of yilGrid

    LastTimeForTemp :Date = null;
    LastTimeForHavadakiNem:Date = null;
    LastTimeForTopraktakiNem:Date = null;
    LastTimeForIsiginGucu:Date = null;


  @ViewChild('cmbTarlaList', { static: false }) cmbTarlaList: YilComboboxViaDatasourceComponent;
  @ViewChild('myBarGaugeTemp', { static: false }) myBarGaugeTemp: jqxBarGaugeComponent;
  @ViewChild('myBarGaugeNem', { static: false }) myBarGaugeNem: jqxBarGaugeComponent;
  @ViewChild('myBarGaugeToprakIslakligi', { static: false }) myBarGaugeToprakIslakligi: jqxBarGaugeComponent;
  @ViewChild('myBarGaugeIsiginGucu', { static: false }) myBarGaugeIsiginGucu: jqxBarGaugeComponent;

  // @ViewChild('myChart', { static: false }) myChart: jqxChartComponent;
  @ViewChild('base', { static: false }) baseListComponent: YilBaseJustListFromDsComponent;
  @ViewChild('toast', { read: ToastComponent, static: false }) toast: ToastComponent;


  sensorDTO : SensorTransactionDTO = null;
  setValues : string[];
  constructor(private _iotSensorService:IotsensortransactionService,
              private _tarlaService:UserTarlaService,
              private _authenticationService:AuthenticationService) 
  {
      this.setValues = [];
      this.iotSensorService = _iotSensorService;
      this.tarlaService = _tarlaService;
      this.authenticationService = _authenticationService;

      this.yilcolumns=
      [
          { text: 'Id', datafield: 'id', width: 120 },
          { text: 'Adı', datafield: 'name', width: 120 },
          { text: 'Değeri', datafield: 'value1', width: 180 },
          { text: 'Zaman', datafield: 'createdDate', width: 250 }    
      ];
  
      this.yildatafields=
      [
          { name: 'id', type: 'number' },
          { name: 'name', type: 'string' },
          { name: 'value1', type: 'number' },
          { name: 'createdDate', type: 'date' }
  
      ];



  }
  ngAfterViewInit(): void {
    this.init();
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

          //this.generateChartData();
          //this.timerFunction();
  }	

  cmbTarlaListChangeValue($event):void{
      var selectedValue =  this.cmbTarlaList.getSelectedValues();
      this.refreshWithTarlaId(+selectedValue);
  }



  
  refreshWithTarlaId(tarlaId:number){
    var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
    this.setBarGauge(tarlaId,true);
    
 }


    formatFunction(value: number, index: number, color: string): string {
        let barGaugePalette = ['#307DD7', '#AA4643', '#89A54E', '#71588F', '#4198AF'];
        if (value < 20) {
            return barGaugePalette[0];
        }
        if (value < 40) {
            return barGaugePalette[1];
        }
        if (value < 60) {
            return barGaugePalette[2];
        }
        if (value < 80) {
            return barGaugePalette[3];
        }
        if (value <= 100) {
            return barGaugePalette[4];
        }
    }
    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    countReflesing = 0;
    setBarGauge(tarlaId:number, withOutCounting){

      if (withOutCounting!=true)
      {
            if (this.countReflesing < 4){
                this.countReflesing++;
                return;
            }
            this.countReflesing=0;
      }
      this.iotSensorService.getByTarlaId(tarlaId).subscribe(
        data_ =>
        {
          if (data_.success)
          {
              this.sensorDTO = data_.data;
              
              if (this.sensorDTO.nemSensorInHairTransactions !=null && this.sensorDTO.nemSensorInHairTransactions.length >0)
              {
                  this.myBarGaugeNem.val([+this.sensorDTO.nemSensorInHairTransactions[0].value1]);
                  this.LastTimeForHavadakiNem = this.sensorDTO.nemSensorInHairTransactions[0].createdDate;

              }

              if (this.sensorDTO.tempSensorInHairTransactions !=null && this.sensorDTO.tempSensorInHairTransactions.length >0)
              {
                  this.myBarGaugeTemp.val([+this.sensorDTO.tempSensorInHairTransactions[0].value1]);
                  this.LastTimeForTemp = this.sensorDTO.tempSensorInHairTransactions[0].createdDate;
              }

              if (this.sensorDTO.toprakIslakligiSensorTransactions !=null && this.sensorDTO.toprakIslakligiSensorTransactions.length >0)
              {
                  this.myBarGaugeToprakIslakligi.val([+this.sensorDTO.toprakIslakligiSensorTransactions[0].value1/10]);
                  this.LastTimeForTopraktakiNem = this.sensorDTO.toprakIslakligiSensorTransactions[0].createdDate;
              }

              if (this.sensorDTO.isiginVurusGucuTransactions !=null && this.sensorDTO.isiginVurusGucuTransactions.length >0)
              {
                  this.myBarGaugeIsiginGucu.val([+this.sensorDTO.isiginVurusGucuTransactions[0].value1/10]);
                  this.LastTimeForIsiginGucu = this.sensorDTO.isiginVurusGucuTransactions[0].createdDate;
              }

              if (this.sensorDTO.hirsizKontrolTransactions !=null && this.sensorDTO.hirsizKontrolTransactions.length >0)
              {
                   this.toast.open();
              }

              
          }


          // // char grid icin start
          // let data = this.myChart.source();
          // data.splice(0, 1);

          // if (data_.success)
          // {
          //     let NemValue :number =0;
          //     let TempValue :number =0;
          //     let ToprakIslakligiValue :number =0;
          //     let IsiginGucuValue: number = 0;

          //   if (this.sensorDTO.nemSensorInHairTransactions !=null && this.sensorDTO.nemSensorInHairTransactions.length >0)
          //   {
          //     NemValue = +this.sensorDTO.nemSensorInHairTransactions[0].value1;
          //   }

          //   if (this.sensorDTO.tempSensorInHairTransactions !=null && this.sensorDTO.tempSensorInHairTransactions.length >0)
          //   {
          //     TempValue = +this.sensorDTO.tempSensorInHairTransactions[0].value1;
          //   }

          //   if (this.sensorDTO.toprakIslakligiSensorTransactions !=null && this.sensorDTO.toprakIslakligiSensorTransactions.length >0)
          //   {
          //     ToprakIslakligiValue=+this.sensorDTO.toprakIslakligiSensorTransactions[0].value1;
          //   }
          //   if (this.sensorDTO.isiginVurusGucuTransactions !=null && this.sensorDTO.isiginVurusGucuTransactions.length >0)
          //   {
          //        IsiginGucuValue=20; // parseInt( +this.sensorDTO.isiginVurusGucuTransactions[0].value1/10);
          //   }
          //     data.push({
          //               key: data[data.length - 1].key + 1,
          //               value1: TempValue,  //(Math.random() * 200) % 200 + 200,
          //               value2: NemValue ,//(Math.random() * 200) % 200 + 500,
          //               value3: ToprakIslakligiValue, //(Math.random() * 200) % 200,
          //               value4: IsiginGucuValue //(Math.random() * 200) % 200,

          //     });
          //   this.myChart.update();
          // }
          // char grid icin end
        });

        this.iotSensorService.getlistbyotherobject(tarlaId).subscribe(
            data_ => 
            {
                this.yildata = data_.data;
                this.baseListComponent.refresh(this.yildata);
            }
        );
    }

    onDrawEnd(): void {
        let values = [this.getRandomInt(1, 99)];
        setTimeout(() => {
          var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
          this.setBarGauge(tarlaId,false);
        
        }, this.refreshTimeout());
    }

  ngOnInit() {

  }

getWidth() : any {
  if (document.body.offsetWidth < 850) {
    return '90%';
  }
  
  return 850;
}

  xAxis: any =
  {
      dataField: 'key',
      unitInterval: 1,
      valuesOnTicks: true,
      gridLines: { visible: false }
  };
  valueAxis: any =
  {
      minValue: 0,
      maxValue: 150,
      title: { text: 'Index Value<br>' },
  };
  seriesGroups: any[] =
  [
      {
          type: 'line',
          useGradientColors: false,
          series: [
              { dataField: 'value1', displayText: 'Sıcaklık', lineWidth: 2, symbolType: 'circle' }
          ]
      },
      {
          type: 'spline',
          useGradientColors: false,
          columnsGapPercent: 50,
          alignEndPointsWithIntervals: true,
          series: [
              { dataField: 'value2', displayText: 'Havadaki Nem' }
          ]
      },
      {
          type: 'column',
          useGradientColors: false,
          columnsGapPercent: 50,
          alignEndPointsWithIntervals: true,
          series: [
              { dataField: 'value3', displayText: 'Toprağın Nemi' }
          ]
      },
      {
        type: 'spline',
        useGradientColors: true,
        columnsGapPercent: 50,
        alignEndPointsWithIntervals: true,
        series: [
            { dataField: 'value4', displayText: 'Isigin Gücü' }
        ]
      }
  ];
  colorsSchemesList: string[] = ['scheme01', 'scheme02', 'scheme03', 'scheme04', 'scheme05', 'scheme06', 'scheme07', 'scheme08'];
  colorsOnChange(event: any): void {
      let value = event.args.item.value;
      // this.myChart.colorScheme(value);
      // this.myChart.update();
  }
  // timerFunction = () => {
  // };
 // timer = setInterval(this.timerFunction, this.refreshTimeout());
  btnOnClick(event): void {
  }
  generateChartData = (): void => {
       
      let max = 200;
      let timestamp = new Date();
      for (let i = 0; i < 2; i++) {
          this.data.push({
              key: i,
              value1: (Math.random() * 20) % 2000 ,
              value2: (Math.random() * 20) % 2000 ,
              value3: (Math.random() * 20) % 2000,
              value4: (Math.random() * 20) % 2000
          });
      }
  }
  refreshTimeout(): number {
      return 30000;
  }

  // asagi yilgrid


}
