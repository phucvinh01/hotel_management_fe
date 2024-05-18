const FormatDateDDD = (dateInput: Date): string => {
    if (dateInput == null) {
        return "";
    }
    const date = new Date(dateInput);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}, Từ ${hours}:${minutes}`;
    return formattedDate;
}
export default FormatDateDDD;