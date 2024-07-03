import { formatDistanceToNow } from 'date-fns';

/**
 * Converts a datetime string to a human-readable "time ago" format.
 * @param datetime - The datetime string to convert.
 * @returns A string representing the time ago.
 */
export function timeAgo(datetime: string): string {
  const date = new Date(datetime);
  const now = new Date();
  const timeDifference = formatDistanceToNow(date, { addSuffix: true });

  return timeDifference;
}
