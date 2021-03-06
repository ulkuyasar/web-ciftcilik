import { idname } from '../_entities/entities';
import { Transaction } from '../_entities/IOT/entitiesforIOT';

class SensorTransactionDTO
{
    nemSensorInHairTransactions : Transaction[];
    tempSensorInHairTransactions :Transaction[];
    toprakIslakligiSensorTransactions :Transaction[];
    isiginVurusGucuTransactions :Transaction[];
    hirsizKontrolTransactions :Transaction[];
}

class ManageSensorGuid extends idname
{
    apiKey :string;
    userId :number;
    userTarlaId :number;
    deviceType:number;
    isParent:boolean;
    parentManageSensorGuidId:number;
    microBoardType:number;

}


class ManageSensorGuidDTO extends ManageSensorGuid
{
    userName :string;
    userTarlaName :string;
    deviceTypeName:string;

    parentManageSensorGuidApiKey :string;
    parentManageSensorGuidUserName :string;
    parentManageSensorGuidUserTarlaName:string;
}


export {  SensorTransactionDTO ,ManageSensorGuid,ManageSensorGuidDTO }