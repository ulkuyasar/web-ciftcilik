import { CurrencyPipe } from '@angular/common';

interface Iidname {
    id: number;
    name: string;
}

class justid {
    id: number;
    responceMesaj:ResponceInfo;
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
    responceMesaj:ResponceInfo; // bu degisecek
}

abstract class idNameDescription extends idname {
    description: string;
}

abstract class Masterdetail extends justid {
    seq: number;
    masterId:number;
}

class Category extends idname {
    
}


class Product extends idname {
    price:number;
    categoryId:number;
    description:string;
    imageUrl:string;   
}

class User extends idname {
    userName:string;
    specialNumber:number;
    balance:number;   
    password: string;
    firstName: string;
    lastName: string;
    salonName:string;
    salonId:number;
    token:string;
    userRoleItems:UserRoleItem[];
}

class UserRoleItem{
    roleName:string;
}


class Transaction extends justid {
    seq: number;
    seansGeneralInfoId: number;
    startDate: Date;
    number: number;
}



export { idname,ResponceInfo,Masterdetail,Category, Product,User ,   
     Transaction,
     MessagingAccrossComponent,UserRoleItem};

