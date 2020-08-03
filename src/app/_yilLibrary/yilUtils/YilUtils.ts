export class YilUtils {         
    public static myProp = "Hello";

    public static doSomething(): string {
      return "World";
    }

    public static addCharacterToLeftSide(mainString:string, size: number, addingCharacter : string) {

        while (mainString.length < size) mainString = addingCharacter + mainString;
        return mainString;
    }

    public static  IsTekSayimi(num):boolean 
    { 
        if ( (num % 2) == 1){
          return true;
        }
        else{
          return false;
        }
    }

}

