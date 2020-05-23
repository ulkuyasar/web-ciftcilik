import { Component, OnInit, ViewChild, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { Subject } from 'rxjs/internal/Subject';
import { DataField } from 'src/app/_entities/entitiesForComponents';
import { idname, MessagingAccrossComponent } from 'src/app/_entities/entities';
import { YilIdNameInheritedService } from '../../yilServices/yil-id-name-inherited.service';

@Component({
  selector: 'app-yil-base-master-list',
  templateUrl: './yil-base-master-list.component.html',
  styleUrls: ['./yil-base-master-list.component.css']
})
export class YilBaseMasterListComponent implements AfterViewInit {
  
  @Input() gridColumns: any[] = [];
  @Input() abstractidnoService: YilIdNameInheritedService<idname>;
 
  @Input() parentSubject:Subject<any>;
  @Input() broadcastComponent:string;
  @Output() EventSetValueToBroadcastComponentName : EventEmitter<any> = new EventEmitter<any>() ;

  private dataFields: DataField[] = [];
  ngOnInit(): void {
        
  }

  notifyChildren(gonderilecekMesaj: MessagingAccrossComponent):boolean {
    this.parentSubject.next(gonderilecekMesaj);
    return true;
  }

  ngAfterViewInit(): void {   
    setTimeout(()=>{ 
      this.refresh();
    },100);
  }

    @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
    data :any;
   
  refresh= (): any =>
  {
    if (this.abstractidnoService!=undefined){
        this.abstractidnoService.getall().subscribe(
          dataValues =>
          { 
              this.data = dataValues,
              this.source.localdata =  this.data,
              //adapter ı yerlestır
              this.dataAdapter = new jqx.dataAdapter(this.source);  
              if (this.myGrid != undefined){
                  this.myGrid.render();         
              }         
          });
      }
   }
   
   
   source: any =
        {
            localdata: this.data,
            datatype: "array",
            datafields: this.dataFields
        };
    dataAdapter: any = new jqx.dataAdapter(this.source);


    GridOnRowSelect(event: any): void {
       let id = event.args.row.id;
       let records = new Array();
       let dataAdapter = this.dataAdapter;
       let length = dataAdapter.records.length;

      if ( this.broadcastComponent !=""){
          const toBroadCast = new MessagingAccrossComponent(this.constructor.name,this.broadcastComponent,
            "GridOnRowSelect", event.args.row);  
            toBroadCast.fromMethod = "GridOnRowSelect";                                                                   
            this.notifyChildren(toBroadCast);
      }
     };
   

}
