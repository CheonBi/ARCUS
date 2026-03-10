/**
 * MainChart 라인 시리즈 설정 상수
 * 새 시리즈 추가 시 이 배열만 수정
 */
export interface LineSeriesConfig {
  dataKey: string;
  name: string;
  stroke: string;
  yAxisId: "left" | "right";
}

export const LINE_SERIES: LineSeriesConfig[] = [
  // Mega Series (Left Axis)
  { dataKey: "mega1", name: "Mega Data 1", stroke: "#0ea5e9", yAxisId: "left" },
  { dataKey: "mega2", name: "Mega Data 2", stroke: "#38bdf8", yAxisId: "left" },
  // Byte Series (Right Axis)
  { dataKey: "byte1", name: "Byte Data 1", stroke: "#8b5cf6", yAxisId: "right" },
  { dataKey: "byte2", name: "Byte Data 2", stroke: "#a78bfa", yAxisId: "right" },
  { dataKey: "byte3", name: "Byte Data 3", stroke: "#c4b5fd", yAxisId: "right" },
];
