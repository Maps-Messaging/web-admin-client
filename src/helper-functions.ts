
export const formatUptime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(days)}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export function numberToDateString(javaTimeInMs: number): string {
  const date = new Date(javaTimeInMs);
  return date.toLocaleTimeString();
}

export function formatNumberWithPowerUnit(number: number): string {
  if (number >= 1_000_000_000_000) {
    return `${Math.round(number / 1_000_000_000_000).toString()}T`;
  } else if (number >= 1_000_000_000) {
    return `${Math.round(number / 1_000_000_000).toString()}G`;
  } else if (number >= 1_000_000) {
    return `${Math.round(number / 1_000_000).toString()}M`;
  } else if (number >= 1_000) {
    return `${Math.round(number / 1_000).toString()}K`;
  }
  return number.toString();
}

