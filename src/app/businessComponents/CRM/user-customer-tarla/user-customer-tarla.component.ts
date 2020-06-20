  import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
  import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
  import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
  import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
  import { NotificationService } from 'src/app/_helpers/notification.service';
  import { UserAdres, UserTarla } from 'src/app/_entities/entitiesforCRM';
  import { UserAdresService } from 'src/app/services/CRM/user-adres.service';
  import { YilComboboxViaServiceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-service/yil-combobox-via-service.component';
  import { YilComboboxViaDatasourceComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-combobox-via-datasource/yil-combobox-via-datasource.component';
  import { CityService } from 'src/app/services/definition/city.service';
  import { DistrictService } from 'src/app/services/definition/district.service';
  import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { YilBaseMasterCrudTheOtherTwoComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud-the-other-two/yil-base-master-crud-the-other-two.component';
import { UserTarlaService } from 'src/app/services/CRM/user-tarla.service';
import { CheckBoxComponent } from 'smart-webcomponents-angular/checkbox';
  
  
  
  @Component({
    selector: 'app-user-customer-tarla',
    templateUrl: './user-customer-tarla.component.html',
    styleUrls: ['./user-customer-tarla.component.css'],
    providers: [UserAdresService]
  })
  export class UserCustomerTarlaComponent implements AfterViewInit //,OnInit,
  {
    @ViewChild('baseTarla', { static: false }) baseMasterCRUD: YilBaseMasterCrudTheOtherTwoComponent;
    @ViewChild('myWindowUserCustomerTarla', { static: false }) myWindowUserCustomerTarla: jqxWindowComponent;
    
    
    @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
    @ViewChild('name', { static: false }) name: jqxInputComponent;
    @ViewChild('donum', { static: false }) donum: jqxNumberInputComponent;
    @ViewChild('adres', { static: false }) adres: jqxInputComponent;
  
    @ViewChild('combyilSehir', { static: false }) combyilSehir: YilComboboxViaServiceComponent;
    @ViewChild('combyilIlce', { static: false }) combyilIlce: YilComboboxViaDatasourceComponent;
    @ViewChild('latitude', { static: false }) latitude: jqxNumberInputComponent;
    @ViewChild('longitude', { static: false }) longitude: jqxNumberInputComponent;
    @ViewChild('chbIsSensorKontrol', { read: CheckBoxComponent, static: false }) chbIsSensorKontrol: CheckBoxComponent;
  
    gridColumns: any[] = [];
    _userTarlaService : UserTarlaService;
    authenticationService:AuthenticationService;
    entityVal : UserTarla;
    _yilAutomaticfillValue:boolean=false;
    cityService:CityService;
    districtService:DistrictService;
  
  
      constructor(protected userTarlaService:UserTarlaService, 
                  protected notificationService:NotificationService,
                  private _cityService:CityService,
                  private _authenticationService:AuthenticationService,
                  private _districtService:DistrictService) {  
      this.cityService = _cityService;  
      this.districtService = _districtService;
      this.entityVal = new UserTarla();
      this._userTarlaService = userTarlaService;
      this.authenticationService = _authenticationService;
      this.gridColumns =
      [
        { freeze: true, text: 'ID', datafield: 'id',width: 80,cellsalign:'right' }, 
        { freeze: false, text: 'Name', datafield: 'name', width: 150,cellsalign:'right' },
        { freeze: false, text: 'Dönüm', datafield: 'donum', width: 150,cellsalign:'right' },
        { freeze: false, text: 'Adres', datafield: 'adres', width: 150,cellsalign:'right' },
        { freeze: false, text: 'Sensorlu Mu', datafield: 'isSensorKontrol', width: 150,cellsalign:'right' }
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
        this.name.val(dataRecord.name);
        this.donum.val(dataRecord.donum);
        this.adres.val(dataRecord.adres);
        this.latitude.val(dataRecord.latitude);
        this.longitude.val(dataRecord.longitude);
        this.chbIsSensorKontrol.checked = dataRecord.isSensorKontrol;
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
        this.name.val("");
        this.donum.val(0);
        this.combyilSehir.clearSelected();
        this.combyilIlce.clearSelected();
        this.latitude.val(0);
        this.longitude.val(0);
        this.chbIsSensorKontrol.checked = false;
    }
  
    EventSetValueToEntityFromModalWindowFormSubclass(entity : any) 
    {
        entity.id = this.id.val();
        entity.name= this.name.val();
        entity.donum= +this.donum.val();
        entity.adres= this.adres.val();
        entity.cityId= +this.combyilSehir.getSelectedValues()[0];
        entity.districtId= +this.combyilIlce.getSelectedValues()[0];
        entity.userId = this.authenticationService.currentlyUserId();
        entity.latitude = this.latitude.val();
        entity.longitude = this.longitude.val();
        entity.isSensorKontrol = this.chbIsSensorKontrol.checked;

    }
   
  }
  
