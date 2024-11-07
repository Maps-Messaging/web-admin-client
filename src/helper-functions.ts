
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

interface DateJson {
  date: {
    year: number;
    month: number;
    day: number;
  };
  time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

export function jsonToDateTime(data: string | DateJson): string {
  // Check if data is a string; if so, parse it to an object
  const parsedData = typeof data === "string" ? JSON.parse(data) : data;


  const { year, month, day } = parsedData.date;
  const { hour, minute, second, nano } = parsedData.time;

  // JavaScript months are zero-indexed, so subtract 1 from the month
  const date = new Date(year, month - 1, day, hour, minute, second, nano / 1e6);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}


export function formatNumberWithPowerUnit(value: number): string {
  // Helper function to determine decimals needed for four significant figures
  const calculateDecimals = (number: number, divisor: number): number => {
    const significantDigits = 4; // We want 4 significant digits
    const integralPartLength = Math.floor(number / divisor).toString().length;
    return Math.max(0, significantDigits - integralPartLength);
  };

  if (value >= 1_000_000_000_000) {
    const decimals = calculateDecimals(value, 1_000_000_000_000);
    return `${(value / 1_000_000_000_000).toFixed(decimals)}T`;
  } else if (value >= 1_000_000_000) {
    const decimals = calculateDecimals(value, 1_000_000_000);
    return `${(value / 1_000_000_000).toFixed(decimals)}G`;
  } else if (value >= 1_000_000) {
    const decimals = calculateDecimals(value, 1_000_000);
    return `${(value / 1_000_000).toFixed(decimals)}M`;
  } else if (value >= 1_000) {
    const decimals = calculateDecimals(value, 1_000);
    return `${(value / 1_000).toFixed(decimals)}K`;
  }
  // For values less than 1000, handle to always show 4 digits
  const decimals = 4 - value.toString().length;
  return value.toFixed(Math.max(0, decimals));
}


