import { Component, OnInit, ViewChild, AfterViewInit, Input, Output,EventEmitter } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
// import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';


import { Subject } from 'rxjs';
import { idname } from 'src/app/_entities/entities';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { DataField } from 'src/app/_entities/entitiesForComponents';
import { YilIdNameInheritedService } from '../../yilServices/yil-id-name-inherited.service';
// import { DataField} from 'src/app/entities/componentEntitties';
// import { YilIdNameInheritedService } from 'src/app/services/yillib/YilIdNameInheritedService';

@Component({
  selector: 'app-yil-base-master-crud',
  templateUrl: './yil-base-master-crud.component.html',
  styleUrls: ['./yil-base-master-crud.component.css']
})
export class YilBaseMasterCRUDComponent implements AfterViewInit //, OnInit
{
  @Input() entityVal : idname;// = new City();
  @Input() modalWindowForm: jqxWindowComponent;
  @Input() gridColumns: any[] = [];
  @Input() abstractidnoService: YilIdNameInheritedService<idname>;

  @Output() EventSetValueToModalWindowForm : EventEmitter<any> = new EventEmitter();
  @Output() EventClearValueToModalWindowForm : EventEmitter<any> = new EventEmitter();
  @Output() EventSetValueToEntityFromModalWindowForm : EventEmitter<any> = new EventEmitter();
  
  
  //region alt sınıflar yatafından kesinlikle tanımlanması gereken yapilar
   private dataFields: DataField[] = [];

  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myDropDownList', { static: false }) myDropDownList: jqxDropDownListComponent;
  @ViewChild('myInput', { static: false }) myInput: jqxInputComponent;
  @ViewChild('myWindowToolbarSearch', { static: false }) myWindowToolbarSearch: jqxWindowComponent;

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


  constructor(  protected notificationService:NotificationService) { 

  }
  
  ngOnInit() {
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
                  let dataRecord = this.myGrid.getrowdata( this.editrow); 
                  this.EventSetValueToModalWindowForm.emit(dataRecord);
                  this.showModalView();
              }
             };
              this.gridColumns.push(editColumn);          
       }
    }
  }
  
  
  ngAfterViewInit(): void {
    
    setTimeout(()=>{ 
       this.createButtons();     
        this.refresh();
    },1000);
  }

  refresh= (): any =>
  {
    if (this.abstractidnoService!=undefined){
        this.abstractidnoService.getall().subscribe(
          data_ =>
          {        
              this.data = data_.data,
              this.source.localdata =  this.data,
              this.dataAdapter = new jqx.dataAdapter(this.source);  
              if (this.myGrid != undefined){
                  this.myGrid.render();         
              }         
          });
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
   addButtonContainer.id = 'addButton';
   deleteButtonContainer.id = 'deleteButton';
   refreshButtonContainer.id = 'refreshButton';
   searchButtonContainer.id = 'searchButton';
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
  let addButton = jqwidgets.createInstance('#addButton', 'jqxButton', addButtonOptions);
  let deleteButtonOptions = {
      width: 80, height: 25, value: 'Delete',
      imgSrc: "../../../assets/images/close.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let deleteButton = jqwidgets.createInstance('#deleteButton', 'jqxButton', deleteButtonOptions);
  let refreshButtonOptions = {
      width: 80, height: 25, value: 'refresh',
      imgSrc: "../../../assets/images/refresh.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let refreshButton = jqwidgets.createInstance('#refreshButton', 'jqxButton', refreshButtonOptions);
  let searchButtonOptions = {
      width: 80, height: 25, value: 'Find',
      imgSrc: "../../../assets/images/search.png",
      imgPosition: 'center', textPosition: 'center',
      textImageRelation: 'imageBeforeText'
  }
  let searchButton = jqwidgets.createInstance('#searchButton', 'jqxButton', searchButtonOptions);
  // add new row.
  addButton.addEventHandler('click', (event: any): void => {
      this.clearModalView(); 
      this.showModalView();
      
  });
  // delete selected row.
  deleteButton.addEventHandler('click', (event: any): void => {
      if (this.myGrid!=undefined)
      {
          let selectedrowindex = this.myGrid.getselectedrowindex();
          let rowscount = this.myGrid.getdatainformation().rowscount;
          var gridId = this.myGrid.getrowid(selectedrowindex);
          var entity = this.myGrid.getrowdata(+gridId);
          if (entity != undefined && entity != null && entity.id > 0){
            if(confirm("Are you sure to delete this entry " + entity.id )) {
                this.abstractidnoService.delete(entity).subscribe(() => {  							       
                this.notificationService.MesajVerSuccess(entity.id + " nolu kayıt başarıyla silinmiştir...");
                this.myGrid.deleterow(gridId);
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
      this.myWindowToolbarSearch.open();
      this.myWindowToolbarSearch.move(60, 60);
  });
}
findBtnOnClick(): void {
  this.myGrid.clearfilters();
  let searchColumnIndex = this.myDropDownList.selectedIndex();
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
  this.myGrid.addfilter(datafield, filtergroup);
  // apply the filters.
  this.myGrid.applyfilters();
}
clearBtnOnClick(): void {
  this.myGrid.clearfilters();
}

public saveBtn(): void {
 
  if (this.myGrid == undefined){
    return;
  }


 
  this.EventSetValueToEntityFromModalWindowForm.emit( this.entityVal);
  if (this.entityVal.id == -1){ //add islemi
    this.abstractidnoService.add(this.entityVal).subscribe(newRow => { 
      this.entityVal.id = newRow.data.id;
      this.notificationService.MesajVerSuccess("Ekleme işlemi başarıyla gerçekleşti... id = " + newRow.data.id);
      this.modalWindowForm.hide();
      this.myGrid.addrow(null, this.entityVal);  
    });  
  }

  if (this.editrow >= 0) {
      //update islemi
        let rowID = this.myGrid.getrowid(this.editrow);
        this.abstractidnoService.getById(this.entityVal.id).subscribe( 
          res =>{
            this.EventSetValueToEntityFromModalWindowForm.emit(res.data);
            this.abstractidnoService.update(res.data).subscribe(() => { 
              this.notificationService.MesajVerSuccess("Güncelleme başarıyla gerçekleşti...");
              this.modalWindowForm.hide();
              this.myGrid.updaterow(rowID, res.data);  							
            });  
          });
    }
}


}


