import { CurrencyPipe } from '@angular/common';

interface Iidname {
    id: number;
    name: string;

    createdDate: Date;
    updatedDate : Date;
    createdUser :string;
    updatedUser :string;
    whichPageId :number;
    recordStatus :boolean;
}

class justid {
    id: number;
    responceMesaj:ResponceInfo;

    createdDate: Date;
    updatedDate : Date;
    createdUser :string;
    updatedUser :string;
    whichPageId :number;
    recordStatus :boolean;
}

class MessagingAccrossComponent
{
    constructor(fromComponentName:string,
        toComponentName:string,
        key:string,
        value:any,
    ) {
        this.fromComponentName = fromComponentName;
        this.toComponentName = toComponentName;
        this.key = key;
        this.value = value;
    }

    isUsefulForThisComponent(kullanilanComponent: string) : boolean
    {
        if (this.toComponentName == "All") return true;
        if (this.toComponentName == kullanilanComponent) return true;
        if (this.toComponentName.indexOf(kullanilanComponent) > -1 ) return true;

        return false;
    }

    isUsefulForThisComponentfromComponent(toWhichComponent: string, fromWhichComponent:string) : boolean
    {
        if (this.toComponentName == "All" && fromWhichComponent == this.fromComponentName) return true;
        if (this.toComponentName == toWhichComponent && fromWhichComponent == this.fromComponentName) return true;
        if (this.toComponentName.indexOf(toWhichComponent) > -1  && fromWhichComponent == this.fromComponentName) return true;

        return false;
    }

    fromComponentName:string;
    fromMethod:string;
    toComponentName:string; // all denırse herkese , Contains isim icerisiyorsa ismi gecen componentlere, direk isim se sadece ona
    toMethod;
    key:string;
    value:any;
    valueExtension:any;
}

class ResponceInfo{  // bu degisecek
    code :number;
    mesaj : string;
	result:boolean;
}

abstract class idname {
    id: number;
    name: string;
   // responceMesaj:ResponceInfo; // bu degisecek

    createdDate: Date;
    updatedDate : Date;
    createdUser :string;
    updatedUser :string;
    whichPageId :number;
    recordStatus :boolean;
}

abstract class idNameDescription extends idname {
    description: string;
}

abstract class Masterdetail extends justid {
    seq: number;
    masterId:number;
}


export { idname,ResponceInfo,Masterdetail,
     MessagingAccrossComponent};


