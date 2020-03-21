
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { Subject } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { YilBaseMasterCRUDComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud/yil-base-master-crud.component';
import { City } from 'src/app/_entities/entities';


@Component({
  selector: 'app-master-city',
  templateUrl: './master-city.component.html',
  styleUrls: ['./master-city.component.css'],  
  providers: [CityService]
})
export class MasterCityComponent extends YilBaseMasterCRUDComponent implements AfterViewInit //,OnInit,
{
  @ViewChild('myWindow', { static: false }) myWindow: jqxWindowComponent;
  @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
  @ViewChild('name', { static: false }) name: jqxInputComponent;
  @ViewChild('plakaNo', { static: false }) plakaNo: jqxInputComponent;

  gridColumns: any[] = [];
  _cityService : CityService;
  entityVal : City;

    constructor(protected cityService:CityService, 
                protected notificationService:NotificationService) {
     
    super(notificationService);
    this.entityVal = new City();
    this._cityService = cityService;
    this.gridColumns =
    [
      { freeze: true, text: 'ID', datafield: 'id',width: 80,cellsalign:'right' }, 
      //{ freeze: true, text: 'Balance', label: 'balance', dataField: 'balance'},
      { freeze: false, text: 'Adı', datafield: 'name', width: 200,cellsalign:'right' }, 
      { freeze: false, text: 'Plaka No', datafield: 'plakaNo', width: 250,cellsalign:'right' }
    ];
   }

  ngOnInit() { 

  }

  EventSetValueToModalWindowFormSubclass(dataRecord : any) 
  {
      this.id.decimal(dataRecord.id);
      this.name.val(dataRecord.name);
      this.plakaNo.val(dataRecord.plakaNo);
  }

  EventClearValueToModalWindowFormSubclass() 
  {
      this.id.decimal(-1);
      this.name.val("");
      this.plakaNo.val("");
  }

  EventSetValueToEntityFromModalWindowFormSubclass(entity : any) 
  {
      entity.id = this.id.val();
      entity.name= this.name.val();
      entity.plakaNo= this.plakaNo.val();
  }
 
}


