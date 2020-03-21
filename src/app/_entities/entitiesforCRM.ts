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
}


class UserRoleItem{
    roleName:string;
}


export { idname,User ,UserRoleItem,
     UserForRegisterDto,UserForLoginDto,UserDetail,CurrentUser};


