import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ChartComponent } from 'smart-webcomponents-angular/chart';
import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
import { IotsensortransactionService } from 'src/app/services/IOT/iotsensortransaction.service';
import { UserTarlaService } from 'src/app/services/CRM/user-tarla.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { UserTarla } from 'src/app/_entities/entitiesforCRM';
import { Takvim, YearClass, MonthClass } from 'src/app/_yilLibrary/yilUtils/Takvim';
import { EnumValues } from 'src/app/enums/enums';
import { data } from 'jquery';
import { NotificationService } from 'src/app/_helpers/notification.service';

@Component({
  selector: 'app-iotsensortransactionhistory',
  templateUrl: './iotsensortransactionhistory.component.html',
  styleUrls: ['./iotsensortransactionhistory.component.css']
})
export class IotsensortransactionhistoryComponent implements OnInit {

  iotSensorService:IotsensortransactionService;
  tarlaService:UserTarlaService;
  authenticationService:AuthenticationService;
  userTarlas : UserTarla[];
  takvimObj : Takvim;
  notificationService:NotificationService;

  @ViewChild('chart', { read: ChartComponent, static: false }) chart: ChartComponent;
  @ViewChild('cmbTarlaList', { static: false }) cmbTarlaList: YilComboboxViaDatasourceComponent;
  @ViewChild('cmbSensorList', { static: false }) cmbSensorList: YilComboboxViaDatasourceComponent;
  
  @ViewChild('cmbYil', { static: false }) cmbYil: YilComboboxViaDatasourceComponent;
  @ViewChild('cmbAy', { static: false }) cmbAy: YilComboboxViaDatasourceComponent;
  @ViewChild('cmbGun', { static: false }) cmbGun: YilComboboxViaDatasourceComponent;

  constructor(private _iotSensorService:IotsensortransactionService,
              private _tarlaService:UserTarlaService,
              private _authenticationService:AuthenticationService,
              private _notificationService:NotificationService) 
  {
    this.iotSensorService = _iotSensorService;
    this.tarlaService = _tarlaService;
    this.authenticationService = _authenticationService;
    this.notificationService = _notificationService;
    this.takvimObj = new Takvim();
  }

  setValues : string[] = [];
  years: YearClass[]=[];
  mounts: MonthClass[]=[];
  ngOnInit(): void {

      
        
        this.tarlaService.getlistbyotherobject(this.authenticationService.currentlyUserId())
        .subscribe(
            data_ =>
            {
                this.userTarlas = data_.data;
                this.cmbTarlaList.refreshViaListIdName(this.userTarlas);
                
                if (this.userTarlas!=null && this.userTarlas.length > 0){
                    
                    this.setValues.push( this.userTarlas[0].id+"");
                    this.cmbTarlaList.setSelectedValues(this.setValues);
                }
                
                this.years = this.takvimObj.getYears();
                this.mounts = this.takvimObj.getMonths();

                this.cmbYil.refreshViaListIdName(this.years);
                this.cmbAy.refreshViaListIdName(this.mounts);
                this.cmbYil.setSelectedIndexes([0]);
             
                
                var classEnumValues : EnumValues = new EnumValues();
                var Sensorlist = classEnumValues.getSensorTypesClass(false);
                this.cmbSensorList.refreshViaListIdName(Sensorlist);
                this.cmbSensorList.setSelectedIndexes([0]);
                
            });
   }

  seriesGroups = [
      {
        type: 'line',
        series: [
          //  { dataField: 'S&P 500', displayText: 'S&P 500' },
            { dataField: 'value1', displayText: 'Deger' }
        ]
      }
    ];

    listeleClicked(): void {

        this.refreshData();
    }
    
    clearClicked(): void {      
    }
    
    cmbTarlaListChangeValue($event):void{
      var selectedTarlaValue =  this.cmbTarlaList.getSelectedValues();
      this.refreshWithTarlaId(+selectedTarlaValue);
    }

    cmbSensorListChangeValue($event):void{
        var selectedSensorValue =  this.cmbSensorList.getSelectedValues();
        //this.refreshWithTarlaId(+selectedValue);
    }

    cmbYilListChangeValue($event):void{
        this.cmbAy.clearSelected();
        this.cmbGun.clearSelected();
    }

    cmbAyListChangeValue($event):void{
        this.cmbGun.clearSelected();
        var selectedYilValue =  this.cmbYil.getSelectedValues();
        var selectedAyValue =  this.cmbAy.getSelectedValues();
        var daysValue = this.takvimObj.getDays(+selectedAyValue,+selectedYilValue);
        this.cmbGun.refreshViaListIdName( daysValue );
        this.cmbGun.setSelectedIndexes([0]);
    }


     typeFormat(): String{
        var gunSelected = this.cmbGun.getSelectedValues();
        if (+gunSelected == 0) // day secilmemiş, AylikGorunum var
        {
            return 'day';
        } else if (+gunSelected > 0) // day secilmemiş, AylikGorunum var
        {
            return 'hour';
        }
     }

    refreshData():void{
        var yearSelected = this.cmbYil.getSelectedValues();
        var aySelected = this.cmbAy.getSelectedValues();
        var gunSelected = this.cmbGun.getSelectedValues();
        var tarlaIDselected =  this.cmbTarlaList.getSelectedValues();
        var sensorIDselected =  this.cmbSensorList.getSelectedValues();
        debugger;
        this.iotSensorService.getByTarlaIdAndSensorTypeAndDate(+tarlaIDselected,+sensorIDselected,+yearSelected,+aySelected,+gunSelected).subscribe(
            data_ =>
            {
                if (data_.success){
                    this.dataSource = data_.data;

                    this.xAxis = {
                        dataField: 'createdDate',
                        formatFunction: (value: Date) => {
                            return value.getDate() + '-' + this.monthFormatter.format(value) + '-' + value.getFullYear();
                        },
                        type: 'date',
                        baseUnit: 'day',
                        valuesOnTicks: true,
                        minValue: '07-01-2020',
                        maxValue: '08-01-2020',
                        tickMarks: {
                            visible: true,
                            unitInterval: 1,
                            color: '#BCBCBC'
                        },
                        unitInterval: 1,
                        gridLines: {
                            visible: true,
                            unitInterval: 3,
                            color: '#BCBCBC'
                        },
                        labels: {
                            angle: -45,
                            rotationPoint: 'topright',
                            offset: { x: -25, y: 0 }
                        }
                    };


                    this.chart.refresh();

                } else {
                    this.notificationService.MesajVerWarning(data_.message); 
                  //  this.notificationService.warning(data_.message);

                }
            }
        );

    }

   

    refreshWithTarlaId(tarlaId:number){
        var tarlaId = +this.cmbTarlaList.getSelectedValues()[0];
       // this.setBarGauge(tarlaId,true);   
     }


    sampleData:any = [];
    monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
    caption = 'Seranızın Geçmişe Yönelik Verileri';
    description = 'Verileriniz Grafiksel Görünümü';
    showLegend = true;
    enableCrosshairs = true;
    crosshairsDashStyle = '2,2';
    crosshairsLineWidth = 1;
    padding = { left: 10, top: 5, right: 30, bottom: 5 };
    titlePadding = { left: 10, top: 0, right: 0, bottom: 10 };
    dataSource = this.sampleData;
    colorScheme = 'scheme30';
    showToolTipsOnAllSeries = true;
    xAxis = {
        dataField: 'createdDate',
        formatFunction: (value: Date) => {
            return value.getDate() + '-' + this.monthFormatter.format(value) + '-' + value.getFullYear();
        },
        type: 'date',
        baseUnit: 'month',
        valuesOnTicks: true,
        minValue: '01-01-2020',
        maxValue: '01-01-2021',
        tickMarks: {
            visible: true,
            unitInterval: 1,
            color: '#BCBCBC'
        },
        unitInterval: 1,
        gridLines: {
            visible: true,
            unitInterval: 3,
            color: '#BCBCBC'
        },
        labels: {
            angle: -45,
            rotationPoint: 'topright',
            offset: { x: -25, y: 0 }
        }
    };
    valueAxis = {
        visible: true,
        title: { text: '100 birim üzerinden<br>' },
        tickMarks: { color: '#BCBCBC' }
    };
    

   

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        // init code.
    }
}
