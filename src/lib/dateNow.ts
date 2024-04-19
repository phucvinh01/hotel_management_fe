export const dateNow = (): string => {
  var currentDate = new Date();

  return (
    currentDate.getFullYear() +
    '-' +
    String(currentDate.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(currentDate.getDay()).padStart(2, '0')
  );
};