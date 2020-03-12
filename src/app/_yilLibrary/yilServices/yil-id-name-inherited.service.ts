import { Injectable } from '@angular/core';
import { idname } from 'src/app/_entities/entities';
import { YilBaseInheritedService } from './yil-base-inherited.service';

@Injectable(
  )
  export  class YilIdNameInheritedService<T extends idname> extends YilBaseInheritedService<T> {
   
    public apiControllerName(): string {
      return "Method not implemented.";
    }
  }
