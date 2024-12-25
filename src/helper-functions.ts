
/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
  try {
    let parsedData: DateJson;

    if (typeof data === "string") {
      // Directly split and parse the known format
      const [datePart, timePart] = data.split(" ");
      if (!datePart || !timePart) {
        throw new Error("Invalid date/time format");
      }

      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, minute, second] = timePart.split(":").map(Number);

      parsedData = {
        date: { year, month, day },
        time: { hour, minute, second, nano: 0 },
      };
    } else {
      parsedData = data;
    }

    // Validate parsedData structure
    const { year, month, day } = parsedData.date;
    const { hour, minute, second, nano } = parsedData.time;

    if (
      ![year, month, day, hour, minute, second, nano].every(
        (val) => typeof val === "number" && !isNaN(val)
      )
    ) {
      throw new Error("Invalid DateJson format");
    }

    // Construct date with zero-indexed month
    const date = new Date(year, month - 1, day, hour, minute, second, nano / 1e6);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  } catch (error) {
    return new Date(0).toISOString();
  }
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


