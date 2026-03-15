export type EventLogRangeKey = "today" | "3d" | "7d" | "30d";
export type EventLogSeverity = "error" | "warning" | "success" | "info";
export type EventLogSeverityFilterKey = "all" | EventLogSeverity;

export interface EventLogRecord {
  id: string;
  occurredAt: string;
  severity: EventLogSeverity;
  summary: string;
  assetName: string;
  metricLabel: string;
  metricValue: string;
  detail: string;
  recommendedAction: string;
}

export interface EventLogRangeOption {
  key: EventLogRangeKey;
  label: string;
  description: string;
}

export interface EventLogSeverityOption {
  key: EventLogSeverityFilterKey;
  label: string;
}

interface EventLogMessageTemplate {
  summary: string;
  metricLabel: string;
  getMetricValue: (index: number) => string;
  detail: string;
  recommendedAction: string;
}

const POWER_ASSETS = [
  "주변압기 T1",
  "주변압기 T2",
  "수전반 A",
  "수전반 B",
  "ESS 랙 3",
  "태양광 인버터 2호기",
  "냉동창고 분전반",
  "공조기 전력반",
] as const;

const EVENT_LOG_MESSAGES: Record<EventLogSeverity, readonly EventLogMessageTemplate[]> = {
  error: [
    {
      summary: "수전 전압 불평형 임계치 초과",
      metricLabel: "전압 불평형",
      getMetricValue: (index) => `${(3.2 + (index % 4) * 0.5).toFixed(1)} %`,
      detail: "3상 전압 편차가 보호 기준을 넘어 상간 부하 재배치와 수전 계통 점검이 필요한 상태입니다.",
      recommendedAction: "PT 계측값과 상별 부하 분산 상태를 우선 점검하세요.",
    },
    {
      summary: "변압기 부하율 급상승",
      metricLabel: "부하율",
      getMetricValue: (index) => `${88 + (index % 5) * 3} %`,
      detail: "주변압기 순간 부하율이 급증해 냉동 설비와 공조 설비의 동시 기동 영향이 의심됩니다.",
      recommendedAction: "고부하 설비의 투입 시점과 피더별 전류 편차를 확인하세요.",
    },
    {
      summary: "ESS 랙 온도 경보 발생",
      metricLabel: "배터리 랙 온도",
      getMetricValue: (index) => `${39 + (index % 4)} °C`,
      detail: "배터리 랙 내부 온도가 상승해 충방전 제어 제한이 걸렸으며 열관리 계통 확인이 필요합니다.",
      recommendedAction: "냉각팬 동작 상태와 랙별 셀 밸런싱 이력을 점검하세요.",
    },
  ],
  warning: [
    {
      summary: "역률 저하 추세 감지",
      metricLabel: "역률",
      getMetricValue: (index) => (0.79 + (index % 3) * 0.03).toFixed(2),
      detail: "무효전력 증가로 전력 손실이 확대될 수 있어 보상설비 투입 상태를 확인해야 합니다.",
      recommendedAction: "콘덴서 뱅크 동작 여부와 고조파 유입 구간을 확인하세요.",
    },
    {
      summary: "태양광 인버터 출력 편차 확대",
      metricLabel: "출력 편차",
      getMetricValue: (index) => `${6 + (index % 4) * 1.5} %`,
      detail: "동일 스트링 대비 인버터 출력 차이가 벌어져 모듈 오염 또는 스트링 불균형 가능성이 있습니다.",
      recommendedAction: "인버터별 DC 입력 전압과 스트링 단선 여부를 확인하세요.",
    },
    {
      summary: "피크 수요 목표치 접근",
      metricLabel: "15분 수요전력",
      getMetricValue: (index) => `${910 + (index % 6) * 18} kW`,
      detail: "이번 수요 구간의 평균 부하가 계약전력 목표치에 근접해 피크 저감 제어 여유가 줄고 있습니다.",
      recommendedAction: "비필수 부하 제어 스케줄과 ESS 방전 예약 상태를 검토하세요.",
    },
  ],
  success: [
    {
      summary: "무효전력 보상 제어 정상 복귀",
      metricLabel: "보상 후 역률",
      getMetricValue: (index) => (0.94 + (index % 3) * 0.01).toFixed(2),
      detail: "콘덴서 뱅크 제어가 정상 투입되며 목표 역률 범위로 복귀했습니다.",
      recommendedAction: "다음 피크 시간대까지 자동 제어 모드를 유지하세요.",
    },
    {
      summary: "예비 피더 절체 시험 완료",
      metricLabel: "절체 시간",
      getMetricValue: (index) => `${180 + (index % 4) * 12} ms`,
      detail: "예비 피더 절체 시험이 허용 시간 내에 완료되어 비상 급전 경로가 확보되었습니다.",
      recommendedAction: "절체 이력은 월간 점검 리포트에 반영하면 됩니다.",
    },
    {
      summary: "ESS 충방전 제어 안정화",
      metricLabel: "SOC",
      getMetricValue: (index) => `${58 + (index % 5) * 4} %`,
      detail: "ESS 출력 제어가 재조정되어 부하 추종 응답이 안정 범위로 복귀했습니다.",
      recommendedAction: "운영계획 기준 SOC 범위를 유지하며 다음 제어 주기를 관찰하세요.",
    },
  ],
  info: [
    {
      summary: "피크 저감 스케줄 시작",
      metricLabel: "목표 감축 전력",
      getMetricValue: (index) => `${90 + (index % 4) * 10} kW`,
      detail: "계약전력 초과 방지를 위한 부하 제어 스케줄이 시작되어 일부 설비가 순차 제어됩니다.",
      recommendedAction: "현장 운영팀은 제어 대상 설비의 수동 우회 요청 여부만 확인하면 됩니다.",
    },
    {
      summary: "야간 충전 모드 전환",
      metricLabel: "충전 전력",
      getMetricValue: (index) => `${220 + (index % 5) * 15} kW`,
      detail: "심야 요금 구간 진입에 따라 ESS와 전기차 충전 부하가 야간 충전 모드로 전환되었습니다.",
      recommendedAction: "계획된 충전 부하가 계약전력 범위 안에 있는지만 확인하세요.",
    },
    {
      summary: "스마트미터 동기화 완료",
      metricLabel: "수집 성공률",
      getMetricValue: (index) => `${98 + (index % 3)} %`,
      detail: "분전반별 계량 데이터 수집 주기가 정상화되어 대시보드 집계가 최신 상태로 반영됩니다.",
      recommendedAction: "다음 정시 수집 전까지 추가 조치 없이 모니터링만 유지하세요.",
    },
  ],
};

const EVENT_LOG_SEQUENCE: readonly EventLogSeverity[] = [
  "error",
  "warning",
  "success",
  "info",
  "warning",
  "error",
  "info",
  "success",
] as const;

export const EVENT_LOG_RANGE_OPTIONS: readonly EventLogRangeOption[] = [
  { key: "today", label: "오늘", description: "금일 데이터" },
  { key: "3d", label: "3일", description: "최근 3일" },
  { key: "7d", label: "7일", description: "최근 7일" },
  { key: "30d", label: "30일", description: "최근 30일" },
];

export const EVENT_LOG_SEVERITY_OPTIONS: readonly EventLogSeverityOption[] = [
  { key: "all", label: "전체" },
  { key: "error", label: "장애" },
  { key: "warning", label: "주의" },
  { key: "success", label: "정상" },
  { key: "info", label: "안내" },
];

export const getEventLogRangeLabel = (range: EventLogRangeKey) => {
  if (range === "today") {
    return "오늘";
  }

  if (range === "3d") {
    return "최근 3일";
  }

  if (range === "7d") {
    return "최근 7일";
  }

  return "최근 30일";
};

export const getEventLogSeverityFilterLabel = (severity: EventLogSeverityFilterKey) => {
  if (severity === "all") {
    return "전체";
  }

  return getEventLogSeverityMeta(severity).label;
};

export const getEventLogSeverityMeta = (severity: EventLogSeverity) => {
  if (severity === "error") {
    return {
      label: "장애",
      description: "즉시 현장 점검과 보호계전 확인이 필요한 고위험 이벤트입니다.",
      dotStyle: {
        backgroundColor: "rgb(var(--severity-error-surface))",
      },
      badgeStyle: {
        borderColor: "rgb(var(--severity-error-surface) / 0.24)",
        backgroundColor: "rgb(var(--severity-error-surface) / 0.12)",
        color: "rgb(var(--severity-error-strong))",
      },
    };
  }

  if (severity === "warning") {
    return {
      label: "주의",
      description: "전력 품질 또는 부하율 저하 가능성이 있어 선제 대응이 필요한 이벤트입니다.",
      dotStyle: {
        backgroundColor: "rgb(var(--severity-warning-surface))",
      },
      badgeStyle: {
        borderColor: "rgb(var(--severity-warning-surface) / 0.28)",
        backgroundColor: "rgb(var(--severity-warning-surface) / 0.12)",
        color: "rgb(var(--severity-warning-strong))",
      },
    };
  }

  if (severity === "success") {
    return {
      label: "정상",
      description: "제어 또는 복구 작업이 완료되어 설비 상태가 안정 범위로 복귀한 이벤트입니다.",
      dotStyle: {
        backgroundColor: "rgb(var(--severity-success-surface))",
      },
      badgeStyle: {
        borderColor: "rgb(var(--severity-success-surface) / 0.24)",
        backgroundColor: "rgb(var(--severity-success-surface) / 0.12)",
        color: "rgb(var(--severity-success-strong))",
      },
    };
  }

  return {
    label: "안내",
    description: "운영 스케줄, 모드 전환, 계측 동기화 같은 참고용 이력 이벤트입니다.",
    dotStyle: {
      backgroundColor: "rgb(var(--severity-info-surface))",
    },
    badgeStyle: {
      borderColor: "rgb(var(--severity-info-surface) / 0.24)",
      backgroundColor: "rgb(var(--severity-info-surface) / 0.12)",
      color: "rgb(var(--severity-info-strong))",
    },
  };
};

const getRangeStart = (range: EventLogRangeKey, now: Date) => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (range === "today") {
    return start;
  }

  if (range === "3d") {
    start.setDate(start.getDate() - 2);
    return start;
  }

  if (range === "7d") {
    start.setDate(start.getDate() - 6);
    return start;
  }

  start.setDate(start.getDate() - 29);
  return start;
};

export const formatEventLogDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));

export const getEventLogMockData = (now: Date): EventLogRecord[] => {
  const anchor = new Date(now);
  anchor.setMinutes(0, 0, 0);

  return Array.from({ length: 84 }, (_, index): EventLogRecord => {
    const severity = EVENT_LOG_SEQUENCE[index % EVENT_LOG_SEQUENCE.length];
    const templates = EVENT_LOG_MESSAGES[severity];
    const template = templates[index % templates.length];
    const occurredAt = new Date(anchor);
    const hourOffset = index * 8 + (index % 5) * 3 + (severity === "error" ? 1 : 0);
    const metricValue = template.getMetricValue(index);

    occurredAt.setHours(anchor.getHours() - hourOffset);

    return {
      id: `power-event-${index}`,
      occurredAt: occurredAt.toISOString(),
      severity,
      summary: template.summary,
      assetName: POWER_ASSETS[index % POWER_ASSETS.length],
      metricLabel: template.metricLabel,
      metricValue,
      detail: `${template.detail} 현재 ${template.metricLabel}은 ${metricValue}로 집계되었으며 추적번호 PE-${String(index + 1).padStart(3, "0")}에 연결되어 있습니다.`,
      recommendedAction: template.recommendedAction,
    };
  }).sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime());
};

export const getEventLogsByRange = (logs: EventLogRecord[], range: EventLogRangeKey, now: Date) => {
  const start = getRangeStart(range, now).getTime();

  return logs.filter((log) => new Date(log.occurredAt).getTime() >= start);
};

export const filterEventLogsBySeverity = (logs: EventLogRecord[], severity: EventLogSeverityFilterKey) => {
  if (severity === "all") {
    return logs;
  }

  return logs.filter((log) => log.severity === severity);
};
