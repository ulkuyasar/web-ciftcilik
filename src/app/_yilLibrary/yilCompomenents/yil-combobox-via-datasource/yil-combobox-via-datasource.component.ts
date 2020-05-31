import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { idname } from 'src/app/_entities/entities';
import { ComboBoxComponent } from 'smart-webcomponents-angular/combobox';
import { YilMapperHelperService } from 'src/app/_helpers/yil-mapper-helper.service';
import { LabelValueType } from 'src/app/_entities/entitiesForComponents';

@Component({
  selector: 'app-yil-combobox-via-datasource',
  templateUrl: './yil-combobox-via-datasource.component.html',
  styleUrls: ['./yil-combobox-via-datasource.component.css']
})

export class YilComboboxViaDatasourceComponent implements AfterViewInit {

  // @Input() abstractidnoService: YilIdNameInheritedService<idname>; 
     yilMapperHelperService : YilMapperHelperService

  constructor( private _yilMapperHelperService : YilMapperHelperService) { 
    this.yilMapperHelperService = _yilMapperHelperService; 
  }

  @ViewChild('myComboBoxViaDataSource', { read:ComboBoxComponent, static: false }) myComboBoxViaDataSource: ComboBoxComponent;
  ngAfterViewInit(): void {

  }

refreshViaLabelValues(listOfLabelValues: LabelValueType[]){
    this.myComboBoxViaDataSource.dataSource = listOfLabelValues ;      
}

refreshViaListIdName(listOfLabelValues: idname[]){
    this.myComboBoxViaDataSource.dataSource = this.yilMapperHelperService.mappingidNameToLabelValue(listOfLabelValues) ;      
}

clearSelected()
{
  this.myComboBoxViaDataSource.selectedIndexes = [-1];
}

setSelectedIndexes(selected:number[])
{
  this.myComboBoxViaDataSource.selectedIndexes =selected;
}

setSelectedValues(selected:string[])
{
  this.myComboBoxViaDataSource.selectedValues =selected;
}

getSelectedValues() : string[]
{
  return this.myComboBoxViaDataSource.selectedValues;
}

getSelectedIndexes() : number[]
{
  return this.myComboBoxViaDataSource.selectedIndexes;
}

}
