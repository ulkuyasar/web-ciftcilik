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

class Category extends idname {
    
}

class City extends idname {
   plakaNo :string;

}

class Product extends idname {
    price:number;
    categoryId:number;
    description:string;
    imageUrl:string;   
}


class CurrentUser { 
    isAdmin: boolean;
    id: number;
    userName: string;
    email: string;
    fullName: string;
}


class User extends idname {
    userName:string;
    password: string;
    firstName: string;
    lastName: string;
    token:string;
    userRoleItems:UserRoleItem[];
    isAdmin:boolean;
}

class UserForRegisterDto 
{
        firstName: string;
        lastName: string;
		email : string;
		password: string;
        // birthday :Date;
		// gender :number;        
}
class UserForLoginDto 
{
		email : string;
		password: string;
}


    class UserDetail extends idname
	{
		userId :number;
		customerType:number;
		prefixName  : string;
		surName  : string;
		tckn  : string;
		vkn  : string;
		birthday :Date;
		gender :number;
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
     MessagingAccrossComponent,UserRoleItem,
     City,UserForRegisterDto,UserForLoginDto,UserDetail,CurrentUser};


