import { Injectable } from '@angular/core';
import { ComboDatasourceType } from 'src/app/_entities/entitiesForComponents';

@Injectable({
  providedIn: 'root'
})
export class ComboboxCustomizeService {

  constructor() { }

  mappingidNameToLabelValue(any) :ComboDatasourceType[]
  {
	  const cbDataSource = [];
	  any.forEach(element => {
		var instance = new ComboDatasourceType();
		instance.value = element.id;
		instance.label = element.name;
		instance.group = "";
		cbDataSource.push(instance);
	  });
	  return cbDataSource;	  
  }




}
