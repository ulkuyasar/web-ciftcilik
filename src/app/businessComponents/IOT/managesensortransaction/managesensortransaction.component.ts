
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { YilBaseMasterCRUDTheOtherOneComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud-the-other-one/yil-base-master-crud-the-other-one.component';
import { ManagesensortransactionService } from 'src/app/services/IOT/managesensortransaction.service';
import { ManageSensorTransaction } from 'src/app/_entities/IOT/entitiesforIOT';
import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
import { EnumValues } from 'src/app/enums/enums';


@Component({
  selector: 'app-managesensortransaction',
  templateUrl: './managesensortransaction.component.html',
  styleUrls: ['./managesensortransaction.component.css']
})

//extends YilBaseMasterCRUDComponent

export class ManagesensortransactionComponent  implements AfterViewInit ,OnInit
{
  @ViewChild('base', { static: false }) base: YilBaseMasterCRUDTheOtherOneComponent;
  @ViewChild('myWindow', { static: false }) myWindow: jqxWindowComponent;
  @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
  @ViewChild('name', { static: false }) name: jqxInputComponent;
  @ViewChild('cmbSensorType', { static: false }) cmbSensorType: YilComboboxViaDatasourceComponent;
  @ViewChild('kritikSeviyeAsagi', { static: false }) kritikSeviyeAsagi: jqxNumberInputComponent;
  @ViewChild('kritikSeviyeYukari', { static: false }) kritikSeviyeYukari: jqxNumberInputComponent;
  @ViewChild('ardiArdinaTekrarlananSeviyeAsagi', { static: false }) ardiArdinaTekrarlananSeviyeAsagi: jqxNumberInputComponent;
  @ViewChild('ardiArdinaTekrarlananSeviyeYukari', { static: false }) ardiArdinaTekrarlananSeviyeYukari: jqxNumberInputComponent;

  gridColumns: any[] = [];
  public _managesensortransactionService : ManagesensortransactionService;
  entityVal : ManageSensorTransaction;
  _yilAutomaticfillValue:boolean=true;
  _id :string = "";

    constructor(protected managesensortransactionService:ManagesensortransactionService, 
                protected notificationService:NotificationService) {
    this.entityVal = new ManageSensorTransaction();
    this._managesensortransactionService = managesensortransactionService;
    this.gridColumns =
    [
      { freeze: true, text: 'ID', datafield: 'id',width: 80,cellsalign:'right'},
      { freeze: false, text: 'Adı', datafield: 'name', width: 200,cellsalign:'right'}, 
      { freeze: false, text: 'KritikSeviyeAsagi', datafield: 'kritikSeviyeAsagi', width: 80,cellsalign:'right' },
      { freeze: false, text: 'KritikSeviyeYukari', datafield: 'kritikSeviyeYukari', width: 80,cellsalign:'right' },
      { freeze: false, text: 'ArdiArdinaTekrarlananSeviyeAsagi', datafield: 'ardiArdinaTekrarlananSeviyeAsagi', width: 80,cellsalign:'right' },
      { freeze: false, text: 'ArdiArdinaTekrarlananSeviyeYukari', datafield: 'ardiArdinaTekrarlananSeviyeYukari', width: 80,cellsalign:'right' }
    ];
   }
  ngAfterViewInit(): void {
    this.base.onYilInitilize();
    var classEnumValues : EnumValues = new EnumValues();
    var list = classEnumValues.getSensorTypesClass(true);
    this.cmbSensorType.refreshViaListIdName(list);
  }

  ngOnInit() { 

  }


  EventSetValueToModalWindowFormSubclass(dataRecord : any)
  {
      this.id.decimal(dataRecord.id);
      this.name.val(dataRecord.name);
      this.cmbSensorType.setSelectedValues([dataRecord.sensorType+""]);
      this.kritikSeviyeAsagi.decimal(dataRecord.kritikSeviyeAsagi);
      this.kritikSeviyeYukari.decimal(dataRecord.kritikSeviyeYukari);
      this.ardiArdinaTekrarlananSeviyeAsagi.decimal(dataRecord.ardiArdinaTekrarlananSeviyeAsagi);
      this.ardiArdinaTekrarlananSeviyeYukari.decimal(dataRecord.ardiArdinaTekrarlananSeviyeYukari);
  }

  EventClearValueToModalWindowFormSubclass()
  {
      this.id.decimal(-1);
      this.name.val("");
      this.kritikSeviyeAsagi.decimal(-1);
      this.kritikSeviyeYukari.decimal(-1);
      this.ardiArdinaTekrarlananSeviyeAsagi.decimal(-1);
      this.ardiArdinaTekrarlananSeviyeYukari.decimal(-1);
  }

  EventSetValueToEntityFromModalWindowFormSubclass(entity : any)
  {
      entity.id = this.id.val();
      entity.name= this.name.val();
      entity.cmbSensorType= +this.cmbSensorType.getSelectedValues()[0];
      entity.kritikSeviyeAsagi = this.kritikSeviyeAsagi.val();
      entity.kritikSeviyeYukari = this.kritikSeviyeYukari.val();
      entity.ardiArdinaTekrarlananSeviyeAsagi = this.ardiArdinaTekrarlananSeviyeAsagi.val();
      entity.ardiArdinaTekrarlananSeviyeYukari = this.ardiArdinaTekrarlananSeviyeYukari.val();
  } 
}


