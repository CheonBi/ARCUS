/**
 * Mock data structures for Recharts implementations.
 * Designed to be easily replaced by real SSE / RESTful APIs in the future.
 */

// 1. 종합 차트 (Main Chart) - Real-Time 6 Series (2 Mega, 4 Byte)
export interface ChartDataPoint {
  time: string; // HH:mm format
  mega1: number | null; // 메가급 데이터 1 (MB)
  mega2: number | null; // 메가급 데이터 2 (MB)
  byte1: number | null; // 바이트급 데이터 1 (Bytes)
  byte2: number | null; // 바이트급 데이터 2 (Bytes)
  byte3: number | null; // 바이트급 데이터 3 (Bytes)
  byte4: number | null; // 바이트급 데이터 4 (Bytes)
}

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
export const generateNextMainChartValues = () => {
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

// Generate initial mock data for the entire 24h (00:00 - 23:55)
export const generateInitialChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  // Using minutes rounded down to nearest 5
  const currentMinute = Math.floor(now.getMinutes() / 5) * 5;

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

      data.push({
        time: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
        ...(isFuture
          ? {
              mega1: null,
              mega2: null,
              byte1: null,
              byte2: null,
              byte3: null,
              byte4: null,
            }
          : generateNextMainChartValues()),
      });
    }
  }
  return data;
};

// 2. 서브 차트 1 (Area Chart) - E.g. Network Traffic
export interface SubChart1DataPoint {
  time: string;
  value: number;
}

export const mockSubChartAreaData: SubChart1DataPoint[] = [
  { time: "1", value: 10 },
  { time: "2", value: 45 },
  { time: "3", value: 20 },
  { time: "4", value: 80 },
  { time: "5", value: 35 },
  { time: "6", value: 60 },
  { time: "7", value: 50 },
];

// 3. 서브 차트 2 (Bar Chart) - E.g. Active Connections by Region
export interface SubChart2DataPoint {
  category: string;
  value: number;
}

export const mockSubChartBarData: SubChart2DataPoint[] = [
  { category: "KR", value: 400 },
  { category: "US", value: 300 },
  { category: "JP", value: 200 },
  { category: "EU", value: 278 },
  { category: "SG", value: 189 },
];
