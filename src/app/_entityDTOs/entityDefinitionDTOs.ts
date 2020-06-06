

class WheatherDetaillDTO
{
    main:string;
    description:string;
    icon:string;
}

class WheatherBaseDTO{
    zaman:Date;
    zamanStr:string;
    tempCelcius:number;
    feels_likeCelcius:number;
    pressure:number; // basınc
    humidity:number; //nem
    dew_point:number;
    clouds:number; // Cloudiness, %   oranı
    uvi:number;   // untroviolel index 0'dan 15'e kadar uzanan bir ölçek üzerinde sınıflandırılmasına 'UV İndeksi
    wind_speed:number;
    wind_deg:number;
    weather:WheatherDetaillDTO[];
}

class DailyTemp
{
    day:number;
    night:number;
    eve:number;
    morn:number;
}

class WheatherGeneralDTO extends WheatherBaseDTO{
    temp:number;
    feels_like:number;

}

class WheatherGeneralDailyDTO extends WheatherBaseDTO{
    temp:DailyTemp;
    feels_like:DailyTemp;
}

class WheatherHeaderAndDetailDTO{
    tarlaId:number;
    userId:number;
    tarlaName:string;
    lat:number;
    lon:number;

    current:WheatherGeneralDTO;
    todayMorning:WheatherGeneralDTO;
    todayOglen:WheatherGeneralDTO;
    todayAksam:WheatherGeneralDTO;
    todayGece:WheatherGeneralDTO;

    hourly:WheatherGeneralDTO[];
    daily:WheatherGeneralDailyDTO[];
    // geri kalanini sen yap
}


export { DailyTemp, WheatherBaseDTO, WheatherHeaderAndDetailDTO ,
         WheatherGeneralDTO, WheatherDetaillDTO, WheatherGeneralDailyDTO }