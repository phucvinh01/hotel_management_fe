const FormatStringToDate = (inputDate: string, charSplit: string, dateCurrentFormat: 'DMY' | 'YMD'):
    Date | null => {
    if (inputDate == '')
        return null;
    else if (dateCurrentFormat == 'DMY') {
        return new Date(Number.parseInt(inputDate.split(charSplit)[2]),
            Number.parseInt(inputDate.split(charSplit)[1]) - 1,
            Number.parseInt(inputDate.split(charSplit)[0]));
    }
    else {
        return new Date(Number.parseInt(inputDate.split(charSplit)[0]),
            Number.parseInt(inputDate.split(charSplit)[1]) - 1,
            Number.parseInt(inputDate.split(charSplit)[2]))
    }

}
export default FormatStringToDate;