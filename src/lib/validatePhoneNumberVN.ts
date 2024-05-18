export default function validatePhoneNumberVN(phoneNumber: string): boolean {
  const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(phoneNumber);
}
