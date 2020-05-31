import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { UserAdres } from 'src/app/_entities/entitiesforCRM';
import { UserAdresService } from 'src/app/services/CRM/user-adres.service';
import { YilBaseMasterCRUDTheOtherOneComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud-the-other-one/yil-base-master-crud-the-other-one.component';
import { ComboBoxComponent } from 'smart-webcomponents-angular/combobox';
import { YilComboboxViaServiceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-service/yil-combobox-via-service.component';
import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
import { CityService } from 'src/app/services/definition/city.service';
import { DistrictService } from 'src/app/services/definition/district.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';



@Component({
  selector: 'app-user-customer-adres',
  templateUrl: './user-customer-adres.component.html',
  styleUrls: ['./user-customer-adres.component.css'],
  providers: [UserAdresService]
})
export class UserCustomerAdresComponent implements AfterViewInit //,OnInit,
{
  @ViewChild('baseAdres', { static: false }) baseMasterCRUD: YilBaseMasterCRUDTheOtherOneComponent;
  @ViewChild('myWindowUserCustomerAdres', { static: false }) myWindowUserCustomerAdres: jqxWindowComponent;
  @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
  @ViewChild('adres', { static: false }) adres: jqxInputComponent;

  @ViewChild('combyilSehir', { static: false }) combyilSehir: YilComboboxViaServiceComponent;
  @ViewChild('combyilIlce', { static: false }) combyilIlce: YilComboboxViaDatasourceComponent;
  

  gridColumns: any[] = [];
  _userAdresService : UserAdresService;
  authenticationService:AuthenticationService;
  entityVal : UserAdres;
  _yilAutomaticfillValue:boolean=false;
  cityService:CityService;
  districtService:DistrictService;


    constructor(protected userAdresService:UserAdresService, 
                protected notificationService:NotificationService,
                private _cityService:CityService,
                private _authenticationService:AuthenticationService,
                private _districtService:DistrictService) {  
    this.cityService = _cityService;  
    this.districtService = _districtService;
    this.entityVal = new UserAdres();
    this._userAdresService = userAdresService;
    this.authenticationService = _authenticationService;
    this.gridColumns =
    [
      { freeze: true, text: 'ID', datafield: 'id',width: 80,cellsalign:'right' }, 
      { freeze: false, text: 'Adres', datafield: 'adres', width: 250,cellsalign:'right' }
    ];
   }
  ngAfterViewInit(): void {
    
  }

  ngOnInit() { 
  }

  public onYilInitilize(){
     this.baseMasterCRUD.onYilInitilize();
  }

  EventSetValueToModalWindowFormSubclass(dataRecord : any) 
  {
      this.id.decimal(dataRecord.id);
      this.adres.val(dataRecord.adres);
      if ( !isNaN(dataRecord.cityId) && (typeof dataRecord.cityId === 'number')){ 
        this.combyilSehir.setSelectedValues([dataRecord.cityId+""]);
        this.districtService.getlistbyotherobject(dataRecord.cityId).subscribe(data=>{
            this.combyilIlce.refreshViaListIdName(data.data);
            this.combyilIlce.setSelectedValues([dataRecord.districtId+""]);
        })
      }
  }

  cmbyilSehirChangeValue(selectedValuesecord : any){
    if ( !isNaN(selectedValuesecord) && (selectedValuesecord.length >0)){ 
      var selectedSehirId = selectedValuesecord[0];
      
      this.districtService.getlistbyotherobject(+selectedSehirId).subscribe(data=>{
          this.combyilIlce.refreshViaListIdName(data.data);
          this.combyilIlce.clearSelected;
      })
    }

  }


  EventClearValueToModalWindowFormSubclass() 
  {
      this.id.decimal(-1);
      this.adres.val("");
      this.combyilSehir.clearSelected();
      this.combyilIlce.clearSelected();
  }

  EventSetValueToEntityFromModalWindowFormSubclass(entity : any) 
  {
      entity.id = this.id.val();
      entity.adres= this.adres.val();
      entity.cityId= +this.combyilSehir.getSelectedValues()[0];
      entity.districtId= +this.combyilIlce.getSelectedValues()[0];
      entity.userId = this.authenticationService.currentlyUserId();
  }
 
}
