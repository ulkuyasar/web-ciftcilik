import { CurrencyPipe } from '@angular/common';
import { idname } from './entities';

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
	fullName:string;
}


class UserRoleItem{
    roleName:string;
}

class UserTel extends idname
{
	userId :number;
	telType:number;
	prefixTel  : string;
	tel  : string;
}

class UserAdres extends idname
{
	userId :number;
	adresType:number;
    adres  : string;
    cityId:number;
	districtId:number;  
}


class UserTarla extends idname
{
	userId :number;
	tarlaType:number;
    adres  : string;
    cityId:number;
	districtId:number;  
	donum:number;
	latitude:number;
	longitude:number;
	isSensorKontrol:boolean;
//https://www.latlong.net/   den ogrenılebılır
}

export { User ,UserRoleItem,
     UserForRegisterDto,UserForLoginDto,UserDetail,CurrentUser,UserTel,UserAdres,UserTarla};


