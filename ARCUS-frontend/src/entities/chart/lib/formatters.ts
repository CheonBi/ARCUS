/**
 * 포맷 유틸리티 함수
 */

export const formatMega = (value: number) => {
  if (value === null || value === undefined) return "";
  return `${value} MB`;
};

export const formatByte = (value: number) => {
  if (value === null || value === undefined) return "";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} MB`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} KB`;
  return `${value} B`;
};

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const formatDateStamp = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const formatDateTimeStamp = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${formatDateStamp(date)} ${hours}:${minutes}`;
};

export const formatDayLabel = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}.${day}`;
};

export const formatHourLabel = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

//constant
export const numberFormatter = new Intl.NumberFormat("ko-KR");
export const percentFormatter = new Intl.NumberFormat("ko-KR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
