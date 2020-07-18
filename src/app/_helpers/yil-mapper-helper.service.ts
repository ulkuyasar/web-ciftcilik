import { Injectable } from '@angular/core';
import { LabelValueType } from '../_entities/entitiesForComponents';

@Injectable({
  providedIn: 'root'
})
export class YilMapperHelperService {

  constructor() { }

  mappingidNameToLabelValue(any) :LabelValueType[]
  {
	  const cbDataSource = [];
	  any.forEach(element => {
		var instance = new LabelValueType();
		instance.value = element.id;
		instance.label = element.name;
		instance.group = "";
		cbDataSource.push(instance);
	  });
	  return cbDataSource;	  
  }

  mappingidNameToLabelValueWithExternalProperty(any,externalIDPropert:string, externalNameProperty:string) :LabelValueType[]
  {
	  const cbDataSource = [];
	  any.forEach(element => {
		var instance = new LabelValueType();
		instance.value = element[externalIDPropert];
		instance.label = element[externalNameProperty];
		instance.group = "";
		cbDataSource.push(instance);
	  });
	  return cbDataSource;	  
  }


}
