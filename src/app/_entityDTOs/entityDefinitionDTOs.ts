

class WheatherDetaillDTO
{
    main:string;
    description:string;
}

class WheatherBaseDTO{
    zaman:Date;
    pressure:number;
    humidity:number;
    dew_point:number;
    clouds:number;
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
    hourly:WheatherGeneralDTO[];
    daily:WheatherGeneralDailyDTO[];
    // geri kalanini sen yap
}




export { DailyTemp, WheatherBaseDTO, WheatherHeaderAndDetailDTO ,
         WheatherGeneralDTO, WheatherDetaillDTO, WheatherGeneralDailyDTO }