import { idname } from "src/app/_entities/entities";

export class Takvim{
    getDaysInMonth(month,year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
       return new Date(year, month, 0).getDate();
      // Here January is 0 based
      // return new Date(year, month+1, 0).getDate();
    };

    getDays(month,year){
        var maxDayofThisMonth = this.getDaysInMonth(month,year);
        let DayClassList: DayClass[]=[];
        for (let i = 0; i < maxDayofThisMonth+1 ; i++) {
            let item = new DayClass();
            item.id = i;
            if (i==0){
                item.name = "Tümü";
            }else
            {
                item.name = ""+i;   
            }
            DayClassList.push(item);
        }    
       return DayClassList;  
    }
    
    getMonths() : MonthClass[] {

        var list:MonthClass[] = [];
        var type1 =  new MonthClass();
        type1.id = 1;
        type1.name = "Ocak";
        list.push(type1);

        var type2 =  new MonthClass();
        type2.id = 2;
        type2.name = "Şubat";
        list.push(type2);

        var type3 =  new MonthClass();
        type3.id = 3;
        type3.name = "Mart";
        list.push(type3);

        var type4 =  new MonthClass();
        type4.id = 4;
        type4.name = "Nisan";
        list.push(type4);

        var type5 =  new MonthClass();
        type5.id = 5;
        type5.name = "Mayıs";
        list.push(type5);

        var type6 =  new MonthClass();
        type6.id = 6;
        type6.name = "Haziran";
        list.push(type6);

        var type7 =  new MonthClass();
        type7.id = 7;
        type7.name = "Temmuz";
        list.push(type7);

        var type8 =  new MonthClass();
        type8.id = 8;
        type8.name = "Ağustos";
        list.push(type8);

        var type9 =  new MonthClass();
        type9.id = 9;
        type9.name = "Eylül";
        list.push(type9);

        var type10 =  new MonthClass();
        type10.id = 10;
        type10.name = "Ekim";
        list.push(type10);

        var type11 =  new MonthClass();
        type11.id = 11;
        type11.name = "Kasım";
        list.push(type11);

        var type12 =  new MonthClass();
        type12.id = 12;
        type12.name = "Aralık";
        list.push(type12);

    return list;
   }

   getYears() : YearClass[] {
        var list:YearClass[] = [];
        var type0 =  new YearClass();
        type0.id = 2020;
        type0.name = "2020";
        list.push(type0);

        return list;
    }




}

export class YearClass extends idname {
}

export class MonthClass extends idname {
}

export class DayClass extends idname {
}