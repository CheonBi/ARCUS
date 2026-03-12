// Real-Time 6 Series (2 Mega, 4 Byte)
export interface TimeBasePoint {
  time: string; // HH:mm format
  mega1: number | null; // 메가급 데이터 1 (MB)
  mega2: number | null; // 메가급 데이터 2 (MB)
  byte1: number | null; // 바이트급 데이터 1 (Bytes)
  byte2: number | null; // 바이트급 데이터 2 (Bytes)
  byte3: number | null; // 바이트급 데이터 3 (Bytes)
  byte4: number | null; // 바이트급 데이터 4 (Bytes)
}

export interface CategoryBasePoint {
  category: string;
  value: number | null;
}
