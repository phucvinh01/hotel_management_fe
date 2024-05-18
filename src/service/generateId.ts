const GenerateId = (tableName: 'bookinghotel' | 'convenienthotel' | 'diadiemlancan'
    | 'guest' | 'hotel' | 'imageshotel' | 'liststaff' | 'memberbookhotel' | 'message' | 'policyhotel'
    | 'poster' | 'province' | 'ratehotel' | 'room' | 'staff' | 'typeroom' | 'users'
): string => {
    const currentDate = new Date();
    const strDate = currentDate.getFullYear().toString()
        + currentDate.getMonth().toString().padStart(2, "0")
        + currentDate.getDate().toString().padStart(2, "0")
        + currentDate.getHours().toString().padStart(2, "0")
        + currentDate.getMinutes().toString().padStart(2, "0")
        + currentDate.getSeconds().toString().padStart(2, "0")
        + currentDate.getMilliseconds().toString().padStart(2, "0");
    if (tableName == 'bookinghotel')
        return 'B' + strDate;
    else if (tableName == 'convenienthotel')
        return 'Co' + strDate;
    else if (tableName == 'diadiemlancan')
        return 'DDLC' + strDate;
    else if (tableName == 'guest')
        return 'G' + strDate;
    else if (tableName == 'hotel')
        return 'HT' + strDate;
    else if (tableName == 'imageshotel')
        return 'Im' + strDate;
    else if (tableName == 'liststaff')
        return 'LT' + strDate;
    else if (tableName == 'memberbookhotel')
        return 'MB' + strDate;
    else if (tableName == 'message')
        return 'M' + strDate;
    else if (tableName == 'policyhotel')
        return 'Po' + strDate;
    else if (tableName == 'poster')
        return 'P' + strDate;
    else if (tableName == 'province')
        return 'Pro' + strDate;
    else if (tableName == 'room')
        return 'R' + strDate;
    else if (tableName == 'staff')
        return 'S' + strDate;
    else if (tableName == 'typeroom')
        return 'TR' + strDate;
    else
        return 'U' + strDate;
}
export default GenerateId;