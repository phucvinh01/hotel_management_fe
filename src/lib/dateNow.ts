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

export const getThirtyOneDays = () => {
  const thirtyOneDays: any = [];
  for (let i = 1; i <= 31; i++) {
    thirtyOneDays.push(i);
  }
  return thirtyOneDays;
};

export const getMonths = () => {
  const Months: any = [];
  for (let i = 1; i <= 12; i++) {
    Months.push(i);
  }
  return Months;
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years: any = [];
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push(i);
  }
  return years;
};
