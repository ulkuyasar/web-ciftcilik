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


export {  SensorTransactionDTO }