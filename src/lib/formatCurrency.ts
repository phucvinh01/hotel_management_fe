export function formatCurrency(number:number) {
    // Định dạng số thành chuỗi, sau đó thêm dấu phẩy mỗi ba số
    const formattedNumber = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Thêm dấu chấm vào sau số thập phân (nếu có)
    const parts = formattedNumber?.split(".");
    const decimalPart = parts?.length > 1 ? `.${parts[1]}` : "";

    // Thêm ký tự tiền tệ (VND)
    return `${parts?.[0]}${decimalPart} VND`;
}


