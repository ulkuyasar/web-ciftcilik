
import { Component, OnInit, Input, ViewChild, AfterViewInit, Output,EventEmitter } from '@angular/core';
import { idname } from 'src/app/_entities/entities';
import { ComboBoxComponent } from 'smart-webcomponents-angular/combobox';
import { YilIdNameInheritedService } from '../../yilServices/yil-id-name-inherited.service';
import { YilMapperHelperService } from 'src/app/_helpers/yil-mapper-helper.service';



@Component({
  selector: 'app-yil-combobox-via-service',
  templateUrl: './yil-combobox-via-service.component.html',
  styleUrls: ['./yil-combobox-via-service.component.css']
})

export class YilComboboxViaServiceComponent implements AfterViewInit {

  @Input() abstractidnoService: YilIdNameInheritedService<idname>; 
  @Output() EventChangeValue : EventEmitter<any> = new EventEmitter();


  yilMapperHelperService : YilMapperHelperService

  constructor( private _yilMapperHelperService : YilMapperHelperService) { 
    this.yilMapperHelperService = _yilMapperHelperService; 
  }

  @ViewChild('myComboBoxViaService', { read:ComboBoxComponent, static: false }) myComboBoxViaService: ComboBoxComponent;
  ngAfterViewInit(): void {
      this.refresh(); 
      var EventChangeValueTemp = this.EventChangeValue;
      this.myComboBoxViaService.addEventListener('change', function (event) {
        
        let selected = this.selectedValues;
        if (selected!=null){
          EventChangeValueTemp.emit(selected);
        }
      });


  }

refresh(){
  var result = this.abstractidnoService.getall().subscribe(
    dataValues =>
    { 
      this.myComboBoxViaService.dataSource = this.yilMapperHelperService.mappingidNameToLabelValue( dataValues.data ) ;      
    });
}

clearSelected()
{
  this.myComboBoxViaService.selectedIndexes = [-1];
}

setSelectedIndexes(selected:number[])
{
  this.myComboBoxViaService.selectedIndexes =selected;
}

setSelectedValues(selected:string[])
{
  this.myComboBoxViaService.selectedValues =selected;
}

getSelectedValues() : string[]
{
  return this.myComboBoxViaService.selectedValues;
}

getSelectedIndexes() : number[]
{
  return this.myComboBoxViaService.selectedIndexes;
}




}
