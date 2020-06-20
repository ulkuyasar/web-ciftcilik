import { idname } from "../_entities/entities";


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

class EnumValues{
    getSensorTypesClass():SensorTypeClass[]{
        var list:SensorTypeClass[] = [];
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


export { SensorType, SensorTypeClass,EnumValues};