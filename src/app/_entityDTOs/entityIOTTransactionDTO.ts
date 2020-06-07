
class SensorTransactionDTO
{
    nemSensorInHairTransactions : Transaction[];
    tempSensorInHairTransactions :Transaction[];
    toprakIslakligiSensorTransactions :Transaction[];
}



class Transaction
{
    id: number;
    name: string;
    createdDate: Date;
    userId :number;
    tarlaId :number;
    sensorType :number;
    sensorCode :string;
    value1 :number;
    value2 :number;
    value3 :number;
}

export { Transaction, SensorTransactionDTO }