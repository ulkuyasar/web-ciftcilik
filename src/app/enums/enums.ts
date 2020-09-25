import { idname } from "../_entities/entities";


enum DeviceType {
    RaspperryPi3 = 1,
    RaspperryPi4 = 2,
    ArduinoUno = 3,
    ArduinoWemosD1 =4,
    ArduinoWemosD1LoraGateGay =5
}

enum BoardType
{
    LoraClientSensor = 1,    // lora ıle ıletısıme gecen Sensor bılgılerını tasıyan board
    LoraClientAI = 2,        // lora ıle ıletısıme gecen AI bılgılerını tasıyan board
    LoraClientSucurity = 3,  // lora ıle ıletısıme gecen Security bılgılerını tasıyan board
    ServerWemosD1Sensor = 4, // Intertnete direk baglı sensor bilgilerini tasıyan board
    ServerWemosD1AI = 5,     // Intertnete direk baglı AI bilgilerini tasiyan board
    ServerWemosSecurity = 6, // Intertnete direk baglı Security bilgilerini tasiyan board
    LoraWemosD1LoraGateGay = 7   // bilgi alıs verısını saglayan gateway
}


enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

enum SensorType {
    TempInHair = 1,
    NemInHair = 2,
    islaklikInToprak = 3
}

class BoardTypeClass extends idname {
} 

class SensorTypeClass extends idname {
}

class DeviceTypeClass extends idname {
}



class EnumValues{


    // LoraClientSensor = 1,    // lora ıle ıletısıme gecen Sensor bılgılerını tasıyan board
    // LoraClientAI = 2,        // lora ıle ıletısıme gecen AI bılgılerını tasıyan board
    // LoraClientSucurity = 3,  // lora ıle ıletısıme gecen Security bılgılerını tasıyan board
    // ServerWemosD1Sensor = 4, // Intertnete direk baglı sensor bilgilerini tasıyan board
    // ServerWemosD1AI = 5,     // Intertnete direk baglı AI bilgilerini tasiyan board
    // ServerWemosSecurity = 6, // Intertnete direk baglı Security bilgilerini tasiyan board
    // LoraWemosD1LoraGateGay = 7   // bilgi alıs verısını saglayan gateway
    getMicroBoardTypeClass():BoardTypeClass[]{
        var list:BoardTypeClass[] = [];
   
        var type1 =  new BoardTypeClass();
        type1.id = 1;
        type1.name = "Lora_Client_Sensor";

        var type2 =  new BoardTypeClass();
        type2.id = 2;
        type2.name = "Lora_Client_AI";

        var type3 =  new BoardTypeClass();
        type3.id = 3;
        type3.name = "Lora_Client_Sucurity";


        var type4 =  new BoardTypeClass();
        type4.id = 4;
        type4.name = "Server_WemosD1_Sensor";

        var type5 =  new BoardTypeClass();
        type5.id = 5;
        type5.name = "Server_WemosD1_AI";

        
        var type6 =  new BoardTypeClass();
        type6.id = 6;
        type6.name = "Server_WemosD1_Security";

        
        var type7 =  new BoardTypeClass();
        type7.id = 7;
        type7.name = "Lora_WemosD1_LoraGateGay";


        list.push(type1);
        list.push(type2);
        list.push(type3);
        list.push(type4);
        list.push(type5);
        list.push(type6);
        list.push(type7);
        return list;
    }


    getDeviceTypesClass():DeviceTypeClass[]{
        var list:DeviceTypeClass[] = [];
   
        var type1 =  new DeviceTypeClass();
        type1.id = 1;
        type1.name = "Raspperry-Pi 3";

        var type2 =  new DeviceTypeClass();
        type2.id = 2;
        type2.name = "Raspperry-Pi 4";

        var type3 =  new DeviceTypeClass();
        type3.id = 3;
        type3.name = "Arduino-Uno";


        var type4 =  new DeviceTypeClass();
        type4.id = 4;
        type4.name = "Arduino-Wemos-D1";

        var type5 =  new DeviceTypeClass();
        type5.id = 5;
        type5.name = "Arduino-Wemos-D1-LoraGateGay";


        list.push(type1);
        list.push(type2);
        list.push(type3);
        list.push(type4);
        list.push(type5);
        return list;
    }


    getSensorTypesClass(withTumu : boolean):SensorTypeClass[]{
        var list:SensorTypeClass[] = [];
        
        if (withTumu){
            var type0 =  new SensorTypeClass();
            type0.id = -1;
            type0.name = "Tümü";
            list.push(type0);
        }

        var type1 =  new SensorTypeClass();
        type1.id = 1;
        type1.name = "Havadaki Sıcaklik";

        var type2 =  new SensorTypeClass();
        type2.id = 2;
        type2.name = "Havadaki Nem";

        var type3 =  new SensorTypeClass();
        type3.id = 3;
        type3.name = "Topraktaki Nem";


        var type4 =  new SensorTypeClass();
        type4.id = 4;
        type4.name = "Isigin Vurus Gücü";

        var type5 =  new SensorTypeClass();
        type5.id = 5;
        type5.name = "Hırsız Kontrol Kapi Acilmasi";

        var type6 =  new SensorTypeClass();
        type6.id = 6;
        type6.name = "Topragin Sicakligi";

        var type7 =  new SensorTypeClass();
        type7.id = 7;
        type7.name = "Hirsiz Kontrol Mesafe Kontrol";

        var type8 =  new SensorTypeClass();
        type8.id = 8;
        type8.name = "Hirsiz Kontrol Hareket Kontrol";

   
        list.push(type1);
        list.push(type2);
        list.push(type3);
        list.push(type4);
        list.push(type5);
        list.push(type6);
        list.push(type7);
        list.push(type8);
        return list;
    }

}


export { SensorType, SensorTypeClass,DeviceType, DeviceTypeClass, EnumValues};