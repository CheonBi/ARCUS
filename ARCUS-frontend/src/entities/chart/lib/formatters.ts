/**
 * Y축 및 툴팁에서 사용하는 값 포맷 유틸리티 함수
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
