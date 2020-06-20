import { idname } from '../entities';

class Transaction extends idname
{
    userId :number;
    tarlaId :number;
    sensorType :number;
    sensorCode :string;
    value1 :number;
    value2 :number;
    value3 :number;
}


class ManageSensorTransaction extends idname
{
    kritikSeviyeAsagi: number;
    kritikSeviyeYukari :number;
    ardiArdinaTekrarlananSeviyeAsagi :number;
    ardiArdinaTekrarlananSeviyeYukari :number;
    sensorType :number;
}



export { Transaction,ManageSensorTransaction }