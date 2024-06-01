export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  return `🕐 ${hours}:${minutes}  🗓 ${day}/${month}/${year}`;
}


