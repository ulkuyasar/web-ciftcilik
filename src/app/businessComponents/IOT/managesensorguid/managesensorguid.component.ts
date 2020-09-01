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
import { ManageSensorGuid } from 'src/app/_entityDTOs/entityIOTTransactionDTO';
import { ManageSensorGuidService } from 'src/app/services/IOT/manage-sensor-guid.service';
import { UserdetailService } from 'src/app/services/CRM/userdetail.service';
import { UserTarlaService } from 'src/app/services/CRM/user-tarla.service';
import { YilBaseJustListFromDsComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-just-list-from-ds/yil-base-just-list-from-ds.component';
import { data } from 'jquery';
import { CheckBoxComponent } from 'smart-webcomponents-angular/checkbox';


@Component({
  selector: 'app-managesensorguid',
  templateUrl: './managesensorguid.component.html',
  styleUrls: ['./managesensorguid.component.css']
})

//extends YilBaseMasterCRUDComponent

export class ManagesensorguidComponent  implements AfterViewInit ,OnInit
{
  @ViewChild('cmbTarlaList', { static: false }) cmbTarlaList: YilComboboxViaDatasourceComponent;
  @ViewChild('cmbUserList', { static: false }) cmbUserList: YilComboboxViaDatasourceComponent;
  @ViewChild('base', { static: false }) baseListComponent: YilBaseJustListFromDsComponent;
  @ViewChild('cmbDeviceType', { static: false }) cmbDeviceType: YilComboboxViaDatasourceComponent;
  @ViewChild('chbIsParent', { read: CheckBoxComponent, static: false }) chbIsParent: CheckBoxComponent;
  @ViewChild('cmbParentListesi', { static: false }) cmbParentListesi: YilComboboxViaDatasourceComponent;
  
 
  gridColumns: any[] = [];
  public _managesensorguidService : ManageSensorGuidService;
  entityVal : ManageSensorGuid;
  yildatafields : any[] =[];
  yilcolumns : any[] =[];
  yildata:any[]=[];
  userService:UserdetailService;
  tarlaService:UserTarlaService;

  lblUserList: String;  lblTarlaList: String; lblDeviceType: String;lblParentDevice: String;

    constructor(protected managesensorguidService:ManageSensorGuidService, 
                protected notificationService:NotificationService,
                private _tarlaService:UserTarlaService,
                private _userService:UserdetailService) {
    this.entityVal = new ManageSensorGuid();
    this._managesensorguidService = managesensorguidService;
    this.userService =_userService;
    this.tarlaService = _tarlaService;

    this.lblUserList = "Kullnıcılar:";
    this.lblTarlaList= "Tarlalar:";
    this.lblDeviceType= "Board Tipi:";
    this.lblParentDevice= "Bağlı olduğu Lora Gateway Board:";
   
    this.yilcolumns=
    [
        { text: 'Id', datafield: 'id', width: 60 },
       // { text: 'Ad', datafield: 'name', width: 80 },
        { text: 'Apikey', datafield: 'apiKey', width: 300 }   ,
       // { text: 'UserName', datafield: 'userName', width: 120 }   ,  
        { text: 'UserTarlaName', datafield: 'userTarlaName', width: 120 }   ,  
        { text: 'DeviceTypeName', datafield: 'deviceTypeName', width: 200 }  ,
        { text: 'ParentMi', datafield: 'isParent', width: 80 }    
    ];

    this.yildatafields=
    [
        { name: 'id', type: 'number' },
       // { name: 'name', type: 'string' },
        { name: 'apiKey', type: 'string' },
       // { name: 'userName', type: 'string' },
        { name: 'userTarlaName', type: 'string' },
        { name: 'deviceTypeName', type: 'string' },
        { name: 'isParent', type: 'bool' }

       // tarla adı da gelecek sekılde listeleme yaptır
    ];
   }
  ngAfterViewInit(): void {

    var classEnumValues : EnumValues = new EnumValues();
    var list = classEnumValues.getDeviceTypesClass();
    this.cmbDeviceType.refreshViaListIdName(list);

    

    
  }

  ngOnInit() { 
    this.userService.getall().subscribe(
      data_ => {
        this.cmbUserList.refreshViaListIdNameWithExternalProperty(data_.data,"userId","fullName");
      }
    );

    this._managesensorguidService.getLoraGatewayList().subscribe(
      data_ => {
        this.cmbParentListesi.refreshViaListIdNameWithExternalProperty(data_.data,"id","name");
      }
    );

  }



  cmbUserListChangeValue($event):void{
    var selectedUserValue =  this.cmbUserList.getSelectedValues();

    this.tarlaService.getlistbyotherobject(+selectedUserValue).subscribe(
      data_ =>
      {      
        this.cmbTarlaList.refreshViaListIdName(data_.data);
        this.cmbTarlaList.clearSelected();
      });


    this._managesensorguidService.getlistbyUserId(+selectedUserValue).subscribe(
      data_ =>
      {     
        this.yildata = data_.data; 
        this.baseListComponent.refresh(this.yildata); 
      });
  }

  cmbTarlaListChangeValue($event):void{
    var selectedUserValue =  this.cmbUserList.getSelectedValues();
    var selectedTarlaValue =  this.cmbTarlaList.getSelectedValues();
    this._managesensorguidService.getlistbyUserIdAndTarlaId(+selectedUserValue,+selectedTarlaValue).subscribe(
      data_ =>
      {     
        this.yildata = data_.data;  
        this.baseListComponent.refresh(this.yildata);
      });
  }

  kaydetClicked(): void {
    
    var selectedUserValue =  this.cmbUserList.getSelectedValues();
    var selectedTarlaValue =  this.cmbTarlaList.getSelectedValues();
    var selectedDeviceTypeValue =  this.cmbDeviceType.getSelectedValues();
    var selectedParentValue =  this.cmbParentListesi.getSelectedValues();

    

    if (+selectedTarlaValue==0 || +selectedUserValue==0 || +selectedDeviceTypeValue==0){
       this.notificationService.MesajVerWarning("Kaydetmek için User ,Tarla yada Device Tipinden hepsi seçilmelidir...");
    }

    this.entityVal.id = -1;
    this.entityVal.apiKey = "";
    this.entityVal.name = "";
    this.entityVal.userId = +selectedUserValue;
    this.entityVal.userTarlaId = +selectedTarlaValue;
    this.entityVal.deviceType = +selectedDeviceTypeValue;

    this.entityVal.isParent =  this.chbIsParent.checked;
    this.entityVal.parentManageSensorGuidId = +selectedParentValue;

    //backende validasyon ekle 
    //


    this._managesensorguidService.add(this.entityVal).subscribe(
      data =>{
        if (data.success){
          this.notificationService.MesajVerSuccess("Basarıyla Eklendi");
          this.listeleClicked();
        }else{
          this.notificationService.MesajVerError(data.message);
        }
       
    });



  };
  
  
  listeleClicked(): void {
    
    var selectedUserValue =  this.cmbUserList.getSelectedValues();
    if (+selectedUserValue==0) // sadece user senılmısse bırsey yapma
      return;

    var selectedTarlaValue =  this.cmbTarlaList.getSelectedValues();
    if (+selectedTarlaValue==0)
        this.cmbUserListChangeValue(null);
    else
        this.cmbTarlaListChangeValue(null);
  };


  
  onChangeIsParent($event){
    this.cmbParentListesi.clearSelected();
  }



}


