/**
 * Mock data structures for Recharts implementations.
 * Designed to be easily replaced by real SSE / RESTful APIs in the future.
 */

import type { CategoryBasePoint, TimeBasePoint } from "@shared/types/chartValue";

// Global baseline variables for random walk
let currentMega1 = 30;
let currentMega2 = 15;
let currentByte1 = 300000;
let currentByte2 = 150000;
let currentByte3 = 500000;
let currentByte4 = 250000;

// Helper function to generate a smooth random walk value
const getSmoothValue = (current: number, maxChange: number, min: number, max: number) => {
  const change = (Math.random() - 0.5) * 2 * maxChange; // -maxChange to +maxChange
  let nextValue = current + change;
  if (nextValue < min) nextValue = min;
  if (nextValue > max) nextValue = max;
  return Math.floor(nextValue);
};

// Next data point generator (returns just the values without time, for real-time updating)
export const generateNextValues = () => {
  currentMega1 = getSmoothValue(currentMega1, 4, 10, 60);
  currentMega2 = getSmoothValue(currentMega2, 2, 5, 35);
  currentByte1 = getSmoothValue(currentByte1, 30000, 100000, 600000);
  currentByte2 = getSmoothValue(currentByte2, 15000, 50000, 350000);
  currentByte3 = getSmoothValue(currentByte3, 50000, 200000, 1000000);
  currentByte4 = getSmoothValue(currentByte4, 25000, 50000, 500000);

  return {
    mega1: currentMega1,
    mega2: currentMega2,
    byte1: currentByte1,
    byte2: currentByte2,
    byte3: currentByte3,
    byte4: currentByte4,
  };
};

const FALLBACK_VALUES = {
  mega1: null,
  mega2: null,
  byte1: null,
  byte2: null,
  byte3: null,
  byte4: null,
};

const FALLBACK_CATEGORIES: CategoryBasePoint[] = Object.keys(FALLBACK_VALUES).map((key) => ({
  category: key,
  value: null,
}));

// Generate initial mock data for the entire 24h (00:00 - 23:55)
export const generateInitial = (): {
  timebase: TimeBasePoint[];
  categorybase: CategoryBasePoint[];
} => {
  //Using multiple return values
  const timebase: TimeBasePoint[] = [];
  let latestValues: ReturnType<typeof generateNextValues> | null = null;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = Math.floor(now.getMinutes() / 5) * 5; // Using minutes rounded down to nearest 5

  // Reset baselines for new initial generation
  currentMega1 = 30;
  currentMega2 = 15;
  currentByte1 = 300000;
  currentByte2 = 150000;
  currentByte3 = 500000;
  currentByte4 = 250000;

  // Create data points every 5 minutes for 24 hours
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 5) {
      const isFuture = h > currentHour || (h === currentHour && m > currentMinute);
      const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

      const newValue = generateNextValues();

      if (isFuture) {
        timebase.push({ time: timeStr, ...FALLBACK_VALUES });
      } else {
        timebase.push({ time: timeStr, ...newValue });
        latestValues = newValue;
      }
    }
  }

  const categorybase: CategoryBasePoint[] = latestValues
    ? Object.entries(latestValues)
        .filter(([category]) => category.startsWith("byte"))
        .map(([category, value]) => ({
          category,
          value,
        }))
    : FALLBACK_CATEGORIES.filter((c) => c.category.startsWith("byte"));

  return { timebase, categorybase };
};
