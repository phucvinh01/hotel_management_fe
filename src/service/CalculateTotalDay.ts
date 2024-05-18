function CalculateTotalDay(date1: Date, date2: Date): number {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        throw new Error('Tham số phải là các đối tượng Date hợp lệ.');
    }

    const oneDay = 24 * 60 * 60 * 1000; // số milliseconds trong 1 ngày
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
}
export default CalculateTotalDay;