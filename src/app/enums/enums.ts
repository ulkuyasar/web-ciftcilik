import { idname } from "../_entities/entities";


enum DeviceType {
    RaspperryPi3 = 1,
    RaspperryPi4 = 2,
    ArduinoUno = 3,
    ArduinoMega =4
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

class SensorTypeClass extends idname {
}

class DeviceTypeClass extends idname {
}



class EnumValues{

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
        type4.id = 5;
        type4.name = "Arduino-Wemos-D1-LoraGateGay";


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
        type5.name = "Hırsız Kontrol";

   
        list.push(type1);
        list.push(type2);
        list.push(type3);
        list.push(type4);
        list.push(type5);
        return list;
    }

}


export { SensorType, SensorTypeClass,DeviceType, DeviceTypeClass, EnumValues};