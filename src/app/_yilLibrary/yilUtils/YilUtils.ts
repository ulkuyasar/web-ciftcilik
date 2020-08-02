export class YilUtils {         
    public static myProp = "Hello";

    public static doSomething(): string {
      return "World";
    }

    public static addCharacterToLeftSide(mainString:string, size: number, addingCharacter : string) {

        while (mainString.length < size) mainString = addingCharacter + mainString;
        return mainString;
    }


}

