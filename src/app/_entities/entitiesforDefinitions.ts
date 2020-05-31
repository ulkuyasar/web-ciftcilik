import { CurrencyPipe } from '@angular/common';
import { idname } from './entities';


class Category extends idname {
    
}

class City extends idname {
   plakaNo :string;
}

class District extends idname {
   CityId :number;
}




export { Category, City,District};


