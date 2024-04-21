export default function validateInputSignIn(input: string): string {
    // Kiểm tra xem đầu vào có phải là email hay không
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        return 'Email';
    }

    // Kiểm tra xem đầu vào có phải là số điện thoại hay không
    if (/^\d+$/.test(input)) {
        if (input.length === 10) {
            return 'Phone';
        } else {
            return 'Số điện thoại phải có 10 chữ số.';
        }
    }
    return 'Not';
}

