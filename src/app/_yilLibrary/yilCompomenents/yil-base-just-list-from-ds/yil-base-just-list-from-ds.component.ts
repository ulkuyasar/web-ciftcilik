import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DataField } from 'src/app/_entities/entitiesForComponents';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'



@Component({
  selector: 'app-yil-base-just-list-from-ds',
  templateUrl: './yil-base-just-list-from-ds.component.html',
  styleUrls: ['./yil-base-just-list-from-ds.component.css']
})
export class YilBaseJustListFromDsComponent implements AfterViewInit {

    @Input() yilcolumns: any[] = [];
    @Input() yildatafields: any[] = [];
    @Input() yildata: any[] = [];

    @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;

    ngAfterViewInit(): void {
        setTimeout(()=>{    //<<<---    using ()=> syntax
            this.refresh(null); 
          }, 1000);   
    }

    refresh(data: any[] ){
        this.source =
        {
            localdata: data == null ? this.yildata: data,
            datatype: 'array',
            datafields: this.yildatafields
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.myGrid.refresh();
    }


    source: any =
    {
        localdata: this.yildata,
        datatype: 'array',
        datafields: this.yildatafields
    };
    dataAdapter: any = new jqx.dataAdapter(this.source);
    columns: any[] = this.yilcolumns;

    getWidth() : any {
        if (document.body.offsetWidth < 850) {
        return '90%';
        }
        return 850;
        }
}
