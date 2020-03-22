import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { YilBaseMasterCRUDComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud/yil-base-master-crud.component';
import { UserAdres } from 'src/app/_entities/entitiesforCRM';
import { UserAdresService } from 'src/app/services/user-adres.service';

@Component({
  selector: 'app-user-customer-adres',
  templateUrl: './user-customer-adres.component.html',
  styleUrls: ['./user-customer-adres.component.css'],
  providers: [UserAdresService]
})
export class UserCustomerAdresComponent implements AfterViewInit //,OnInit,
{
  @ViewChild('baseAdres', { static: false }) baseMasterCRUD: YilBaseMasterCRUDComponent;
  @ViewChild('myWindowUserCustomerAdres', { static: false }) myWindowUserCustomerAdres: jqxWindowComponent;
  @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
  @ViewChild('adres', { static: false }) adres: jqxInputComponent;

  gridColumns: any[] = [];
  _userAdresService : UserAdresService;
  entityVal : UserAdres;
  _yilAutomaticfillValue:boolean=false;

    constructor(protected userAdresService:UserAdresService, 
                protected notificationService:NotificationService) {    
    this.entityVal = new UserAdres();
    this._userAdresService = userAdresService;
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
  }

  EventClearValueToModalWindowFormSubclass() 
  {
      this.id.decimal(-1);
      this.adres.val("");
  }

  EventSetValueToEntityFromModalWindowFormSubclass(entity : any) 
  {
      entity.id = this.id.val();
      entity.adres= this.adres.val();
  }
 
}
