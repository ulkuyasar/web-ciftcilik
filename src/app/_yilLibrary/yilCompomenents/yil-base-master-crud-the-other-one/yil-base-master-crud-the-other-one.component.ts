import { Component, OnInit, ViewChild, AfterViewInit, Input, Output,EventEmitter } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { Subject } from 'rxjs';
import { idname } from 'src/app/_entities/entities';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { DataField } from 'src/app/_entities/entitiesForComponents';
import { YilIdNameInheritedService } from '../../yilServices/yil-id-name-inherited.service';

import { Guid } from "guid-typescript";
import { CurrentUser } from 'src/app/_entities/entitiesforCRM';

@Component({
  selector: 'app-yil-base-master-crud-the-other-one',
  templateUrl: './yil-base-master-crud-the-other-one.component.html',
  styleUrls: ['./yil-base-master-crud-the-other-one.component.css']
})
export class YilBaseMasterCRUDTheOtherOneComponent implements AfterViewInit //, OnInit
{
  @Input() yilAutomaticfillValue: boolean; // initlitize esnasında mı  data ları getir (true), yoksa manuel cagirilacak mi (false)
  @Input() entityVal : idname;// = new City();
  @Input() modalWindowForm: jqxWindowComponent;
  @Input() gridColumns: any[] = [];
  @Input() abstractidnoService: YilIdNameInheritedService<idname>;
  @Input() currentUser: CurrentUser;

  @Output() EventSetValueToModalWindowForm : EventEmitter<any> = new EventEmitter();
  @Output() EventClearValueToModalWindowForm : EventEmitter<any> = new EventEmitter();
  @Output() EventSetValueToEntityFromModalWindowForm : EventEmitter<any> = new EventEmitter();

  
  
  //region alt sınıflar yatafından kesinlikle tanımlanması gereken yapilar
   private dataFields: DataField[] = [];

  @ViewChild('myGridTheOtherOne', { static: false }) myGridTheOtherOne: jqxGridComponent;
  @ViewChild('myDropDownListTheOtherOne', { static: false }) myDropDownListTheOtherOne: jqxDropDownListComponent;
  @ViewChild('myInput', { static: false }) myInput: jqxInputComponent;
  @ViewChild('myWindowToolbarSearchTheOtherOne', { static: false }) myWindowToolbarSearchTheOtherOne: jqxWindowComponent;

  dataAdapter : any;
  public editrow: number = -1; 
  data :any;
  private IsAddingEditingButtons: boolean = false;
  
  @Input() parentSubjectInput:Subject<any>;  
  protected parentSubjectOutput:Subject<any> = new Subject();

  
//start asagidan doldurulmasi gerekenler
source =
{
    localdata: this.data,
    datatype: 'array',
    datafields:  this.dataFields
};
//end asagidan doldurulanlar

dropDownSource: string[] = ['First Name', 'Last Name', 'Product', 'Quantity', 'Price'];

public onYilInitilize() : void{

  if (!this.IsAddingEditingButtons){
    if (this.gridColumns!=undefined){
      this.IsAddingEditingButtons = true;
    let editColumn : any =  
           { text: 'Düzelt', datafield: 'Edit', columntype: 'button', width: 100,
            cellsrenderer: (): string => {
                return 'Edit';
            },
            buttonclick: (row: number): void => {
                this.editrow = row;
                let dataRecord = this.myGridTheOtherOne.getrowdata( this.editrow); 
                this.EventSetValueToModalWindowForm.emit(dataRecord);
                this.showModalView();
            }
           };
            this.gridColumns.push(editColumn);          
     }
  }
  this.createButtons();     
  this.refresh();
}


  constructor(  protected notificationService:NotificationService) { 
      
  }
  
  ngOnInit() {
    
  }
  
  
  ngAfterViewInit(): void {
    if (this.yilAutomaticfillValue)
      this.onYilInitilize();

  }

  refresh= (): any =>
  {

    if (this.abstractidnoService!=undefined){
      if (this.currentUser==null){ 
            this.abstractidnoService.getall().subscribe(
              data_ =>
              {        
                  this.data = data_.data,
                  this.source.localdata =  this.data,
                  this.dataAdapter = new jqx.dataAdapter(this.source);  
                  if (this.myGridTheOtherOne != undefined){
                      this.myGridTheOtherOne.render();         
                  }         
              });

        } else
        {  
            this.abstractidnoService.getlistbyotherobject(this.currentUser.id).subscribe(
              data_ =>
              {        
                  this.data = data_.data,
                  this.source.localdata =  this.data,
                  this.dataAdapter = new jqx.dataAdapter(this.source);  
                  if (this.myGridTheOtherOne != undefined){
                      this.myGridTheOtherOne.render();         
                  }         
              });
        }
      }
   }


  getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		return 850;
  }
  
  showModalView()
  {
    if (this.modalWindowForm !=undefined){
       this.modalWindowForm.position({ x: 98, y: 168 });
       this.modalWindowForm.open();
    }
  }

  clearModalView()
  {
    this.EventClearValueToModalWindowForm.emit();
  }


createButtonsContainers(statusbar: any): void {

   let buttonsContainer = document.createElement('div');
   buttonsContainer.style.cssText = 'overflow: hidden; position: relative; margin: 5px;';
   let addButtonContainer = document.createElement('div');
   let deleteButtonContainer = document.createElement('div');
   let refreshButtonContainer = document.createElement('div');
   let searchButtonContainer = document.createElement('div');
   addButtonContainer.id = 'addButtonTheOtherOne';
   deleteButtonContainer.id = 'deleteButtonTheOtherOne';
   refreshButtonContainer.id = 'refreshButtonTheOtherOne';
   searchButtonContainer.id = 'searchButtonTheOtherOne';
   addButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
   deleteButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
   refreshButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
   searchButtonContainer.style.cssText = 'float: left; margin-left: 5px;';
   buttonsContainer.appendChild(addButtonContainer);
   buttonsContainer.appendChild(deleteButtonContainer);
   buttonsContainer.appendChild(refreshButtonContainer);
   buttonsContainer.appendChild(searchButtonContainer);
   if (statusbar[0]!=undefined){
     statusbar[0].appendChild(buttonsContainer);
   }
}

createButtons(): void {

  let addButtonOptions = {
      width: 80, height: 25, value: 'Add',
      imgSrc: "../../../assets/images/add.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  
  let addButton = jqwidgets.createInstance('#addButtonTheOtherOne', 'jqxButton', addButtonOptions);
  let deleteButtonOptions = {
      width: 80, height: 25, value: 'Delete',
      imgSrc: "../../../assets/images/close.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let deleteButton = jqwidgets.createInstance('#deleteButtonTheOtherOne', 'jqxButton', deleteButtonOptions);
  let refreshButtonOptions = {
      width: 80, height: 25, value: 'refresh',
      imgSrc: "../../../assets/images/refresh.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let refreshButton = jqwidgets.createInstance('#refreshButtonTheOtherOne', 'jqxButton', refreshButtonOptions);
  let searchButtonOptions = {
      width: 80, height: 25, value: 'Find',
      imgSrc: "../../../assets/images/search.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let searchButton = jqwidgets.createInstance('#searchButtonTheOtherOne', 'jqxButton', searchButtonOptions);
  // add new row.
  addButton.addEventHandler('click', (event: any): void => {
      this.clearModalView(); 
      this.showModalView();
      
  });
  // delete selected row.
  deleteButton.addEventHandler('click', (event: any): void => {
      if (this.myGridTheOtherOne!=undefined)
      {
          let selectedrowindex = this.myGridTheOtherOne.getselectedrowindex();
          let rowscount = this.myGridTheOtherOne.getdatainformation().rowscount;
          var gridId = this.myGridTheOtherOne.getrowid(selectedrowindex);
          var entity = this.myGridTheOtherOne.getrowdata(+gridId);
          if (entity != undefined && entity != null && entity.id > 0){
            if(confirm("Are you sure to delete this entry " + entity.id )) {
                this.abstractidnoService.delete(entity).subscribe(() => {  							       
                this.notificationService.MesajVerSuccess(entity.id + " nolu kayıt başarıyla silinmiştir...");
                this.myGridTheOtherOne.deleterow(gridId);
              });  
            }
          }
    }
  });
  // refresh grid data.
  refreshButton.addEventHandler('click', (event: any): void => {
    this.refresh();
    //alert('olmadı daha sonra dene');
  });
  // search for a record.
  searchButton.addEventHandler('click', (event: any): void => {
      this.myWindowToolbarSearchTheOtherOne.open();
      this.myWindowToolbarSearchTheOtherOne.move(60, 60);
  });
}
findBtnOnTheOtherOneClick(): void {
  this.myGridTheOtherOne.clearfilters();
  let searchColumnIndex = this.myDropDownListTheOtherOne.selectedIndex();
  let datafield = '';
  switch (searchColumnIndex) {
      case 0:
          datafield = 'id';
          break;
      case 1:
          datafield = 'name';
          break;
      case 2:
          datafield = 'kartValue';
          break;
     
  }
  let searchText = this.myInput.val();
  let filtergroup = new jqx.filter();
  let filter_or_operator = 1;
  let filtervalue = searchText;
  let filtercondition = 'contains';
  let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
  filtergroup.addfilter(filter_or_operator, filter);
  this.myGridTheOtherOne.addfilter(datafield, filtergroup);
  // apply the filters.
  this.myGridTheOtherOne.applyfilters();
}
clearBtnOnTheOtherOneClick(): void {
  this.myGridTheOtherOne.clearfilters();
}

public saveBtn(): void {
 
  if (this.myGridTheOtherOne == undefined){
    return;
  }


 
  this.EventSetValueToEntityFromModalWindowForm.emit( this.entityVal);
  if (this.entityVal.id == -1){ //add islemi
    this.abstractidnoService.add(this.entityVal).subscribe(newRow => { 
      this.entityVal.id = newRow.data.id;
      this.notificationService.MesajVerSuccess("Ekleme işlemi başarıyla gerçekleşti... id = " + newRow.data.id);
      this.modalWindowForm.hide();
      this.myGridTheOtherOne.addrow(null, this.entityVal);  
    });  
  }

  if (this.editrow >= 0) {
      //update islemi
        let rowID = this.myGridTheOtherOne.getrowid(this.editrow);
        this.abstractidnoService.getById(this.entityVal.id).subscribe( 
          res =>{
            this.EventSetValueToEntityFromModalWindowForm.emit(res.data);
            this.abstractidnoService.update(res.data).subscribe(() => { 
              this.notificationService.MesajVerSuccess("Güncelleme başarıyla gerçekleşti...");
              this.modalWindowForm.hide();
              this.myGridTheOtherOne.updaterow(rowID, res.data);  							
            });  
          });
    }
}


}



