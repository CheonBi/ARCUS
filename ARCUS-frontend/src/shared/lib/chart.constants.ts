/**
 * Shared Chart 시리즈 설정 상수
 * 메인보드의 여러 위젯 (MainChart, SubChart) 에서 공통으로 사용됩니다.
 */
export type SeriesKey = "mega1" | "mega2" | "byte1" | "byte2" | "byte3" | "byte4";

export interface SeriesConfig {
  dataKey: SeriesKey;
  name: string;
  stroke: string;
  yAxisId: "left" | "right";
}

export const LINE_SERIES: SeriesConfig[] = [
  // Mega Series (Left Axis)
  { dataKey: "mega1", name: "Mega Data 1", stroke: "#0ea5e9", yAxisId: "left" }, // Light Blue
  { dataKey: "mega2", name: "Mega Data 2", stroke: "#ef4444", yAxisId: "left" }, // Red
  // Byte Series (Right Axis)
  { dataKey: "byte1", name: "Byte Data 1", stroke: "#ec4899", yAxisId: "right" }, // Pink
  { dataKey: "byte2", name: "Byte Data 2", stroke: "#f59e0b", yAxisId: "right" }, // Amber
  { dataKey: "byte3", name: "Byte Data 3", stroke: "#10b981", yAxisId: "right" }, // Emerald
  { dataKey: "byte4", name: "Byte Data 4", stroke: "#8b5cf6", yAxisId: "right" }, // Violet
];
