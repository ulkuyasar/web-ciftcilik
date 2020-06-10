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

@Component({
  selector: 'app-iotsensortransactionshow',
  templateUrl: './iotsensortransactionshow.component.html',
  styleUrls: ['./iotsensortransactionshow.component.css']
})
export class IotsensortransactionshowComponent implements AfterViewInit,OnInit {

  iotSensorService:IotsensortransactionService;
  tarlaService:UserTarlaService;
  authenticationService:AuthenticationService;
  sensorData : SensorTransactionDTO[];
  userTarlas : UserTarla[];


  data: any[] = [];
  padding: any = { left: 10, top: 10, right: 10, bottom: 10 };
  titlePadding: any = { left: 0, top: 0, right: 0, bottom: 10 };


  @ViewChild('cmbTarlaList', { static: false }) cmbTarlaList: YilComboboxViaDatasourceComponent;
  @ViewChild('myBarGaugeTemp', { static: false }) myBarGaugeTemp: jqxBarGaugeComponent;
  @ViewChild('myBarGaugeNem', { static: false }) myBarGaugeNem: jqxBarGaugeComponent;
  @ViewChild('myBarGaugeToprakIslakligi', { static: false }) myBarGaugeToprakIslakligi: jqxBarGaugeComponent;
  @ViewChild('myChart', { static: false }) myChart: jqxChartComponent;


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
  }	

  cmbTarlaListChangeValue($event):void{
      var selectedValue =  this.cmbTarlaList.getSelectedValues();
      this.refreshWithTarlaId(+selectedValue);
  }



  
  refreshWithTarlaId(tarlaId:number){
    var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
    this.setBarGauge(tarlaId);
    
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


    setBarGauge(tarlaId:number){
      this.iotSensorService.getByTarlaId(tarlaId).subscribe(
        data_ =>
        {
          if (data_.success)
          {
              this.sensorDTO = data_.data;
              if (this.sensorDTO.nemSensorInHairTransactions !=null && this.sensorDTO.nemSensorInHairTransactions.length >0)
              {
                  this.myBarGaugeNem.val([+this.sensorDTO.nemSensorInHairTransactions[0].value1]);
              }

              if (this.sensorDTO.tempSensorInHairTransactions !=null && this.sensorDTO.tempSensorInHairTransactions.length >0)
              {
                  this.myBarGaugeTemp.val([+this.sensorDTO.tempSensorInHairTransactions[0].value1]);
              }

              if (this.sensorDTO.toprakIslakligiSensorTransactions !=null && this.sensorDTO.toprakIslakligiSensorTransactions.length >0)
              {
                  this.myBarGaugeToprakIslakligi.val([+this.sensorDTO.toprakIslakligiSensorTransactions[0].value1]);
              }
          } 
        });


    }

    onDrawEnd(): void {
        let values = [this.getRandomInt(1, 99)];
        setTimeout(() => {
          var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
          this.setBarGauge(tarlaId);
            // console.log(tarlaId);
            // this.myBarGaugeTemp.val(values);
            // this.myBarGaugeNem.val(values);
            // this.myBarGaugeToprakIslakligi.val(values);
        }, 10000);
    }







  ngOnInit() {
      this.generateChartData();
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
      maxValue: 100,
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
      }
  ];
  colorsSchemesList: string[] = ['scheme01', 'scheme02', 'scheme03', 'scheme04', 'scheme05', 'scheme06', 'scheme07', 'scheme08'];
  colorsOnChange(event: any): void {
      let value = event.args.item.value;
      this.myChart.colorScheme(value);
      this.myChart.update();
  }
  timerFunction = () => {
      let data = this.myChart.source();
      data.splice(0, 1);
      var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
      this.iotSensorService.getByTarlaId(tarlaId).subscribe(
        data_ =>
        {
          if (data_.success)
          {
              let NemValue :number =0;
              let TempValue :number =0;
              let ToprakIslakligiValue :number =0;

            if (this.sensorDTO.nemSensorInHairTransactions !=null && this.sensorDTO.nemSensorInHairTransactions.length >0)
            {
              NemValue = +this.sensorDTO.nemSensorInHairTransactions[0].value1;
            }

            if (this.sensorDTO.tempSensorInHairTransactions !=null && this.sensorDTO.tempSensorInHairTransactions.length >0)
            {
              TempValue = +this.sensorDTO.tempSensorInHairTransactions[0].value1;
            }

            if (this.sensorDTO.toprakIslakligiSensorTransactions !=null && this.sensorDTO.toprakIslakligiSensorTransactions.length >0)
            {
              ToprakIslakligiValue=+this.sensorDTO.toprakIslakligiSensorTransactions[0].value1;
            }



              data.push({
                        key: data[data.length - 1].key + 1,
                        value1: TempValue,  //(Math.random() * 200) % 200 + 200,
                        value2: NemValue ,//(Math.random() * 200) % 200 + 500,
                        value3: ToprakIslakligiValue, //(Math.random() * 200) % 200,
                    });
                    this.myChart.update();
          }
        }
      );    
  };
  timer = setInterval(this.timerFunction, this.refreshTimeout());
  btnOnClick(event): void {
      // if (this.timer) {
      //     clearInterval(this.timer);
      //     this.myBtn.val('Resume');
      //     this.timer = undefined;
      // }
      // else {
      //     this.timer = setInterval(this.timerFunction, this.refreshTimeout());
      //     this.myBtn.val('Pause');
      // }
  }
  generateChartData = (): void => {
       
      let max = 200;
      let timestamp = new Date();
      for (let i = 0; i < 20; i++) {
          this.data.push({
              key: i,
              value1: (Math.random() * 20) % 2000 ,
              value2: (Math.random() * 20) % 2000 ,
              value3: (Math.random() * 20) % 2000,
          });
      }
  }
  refreshTimeout(): number {
      return 10000;
  }
}
