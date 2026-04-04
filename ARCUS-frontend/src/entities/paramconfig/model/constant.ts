import type { ParamInputField, ParamRadioGroup, ParamSwitchItem } from "@entities/paramconfig/model/types";

const INITIAL_INPUT_FIELDS: ParamInputField[] = [
  {
    key: "feedRatio",
    label: "투입 보정 계수",
    description: "원료 투입량 보정값",
    helper: "실측 투입량과 계산 서버 입력값의 스케일을 보정합니다.",
    unit: "x",
    value: "1.042",
  },
  {
    key: "drynessGain",
    label: "건조 이득 계수",
    description: "건조 반응 가중치",
    helper: "건조 구간에서 예상 감량치를 얼마나 공격적으로 반영할지 결정합니다.",
    unit: "x",
    value: "0.984",
  },
  {
    key: "heatLossOffset",
    label: "열손실 오프셋",
    description: "열손실 기준 편차",
    helper: "환경 변화로 생기는 손실값의 기본 offset입니다.",
    unit: "%",
    value: "2.15",
  },
  {
    key: "returnMixBias",
    label: "환류 혼합 편향",
    description: "환류 라인 혼합 편차",
    helper: "재순환 비중이 계산식에 들어가는 편향값입니다.",
    unit: "%",
    value: "4.80",
  },
  {
    key: "densitySlope",
    label: "밀도 기울기 계수",
    description: "밀도 변화 감도",
    helper: "밀도 센서 값 변화가 계산식에 반영되는 기울기입니다.",
    unit: "x",
    value: "0.765",
  },
  {
    key: "residualClamp",
    label: "잔차 제한 계수",
    description: "잔차 보정 상한",
    helper: "실시간 잔차 보정을 과도하게 적용하지 않도록 제한합니다.",
    unit: "x",
    value: "1.200",
  },
  {
    key: "washPenalty",
    label: "세정 페널티 계수",
    description: "세정 구간 패널티",
    helper: "세정 구간 동안 예측값에 가해지는 감산 페널티입니다.",
    unit: "%",
    value: "6.50",
  },
  {
    key: "settlingWindow",
    label: "안정화 시간 계수",
    description: "안정화 구간 윈도우",
    helper: "상태 전환 이후 정상값으로 간주하기 전 대기 시간을 조정합니다.",
    unit: "sec",
    value: "45",
  },
];

const INITIAL_RADIO_GROUPS: ParamRadioGroup[] = [
  {
    key: "temperatureMode",
    label: "온도 보정 모드",
    description: "온도 계수는 현장 운영 철학에 따라 보수형 또는 공격형 상태를 선택합니다.",
    selectedKey: "balanced",
    options: [
      { key: "conservative", label: "보수 운전", description: "온도 변동에 둔감하게 반응하여 안정성을 우선시합니다." },
      { key: "balanced", label: "표준 운전", description: "평균적인 생산 조건에 맞춘 기본 상태입니다." },
      { key: "aggressive", label: "가속 운전", description: "온도 급변 구간에서도 빠르게 보정을 반영합니다." },
    ],
  },
  {
    key: "washProfile",
    label: "세정 곡선 프로필",
    description: "세정 관련 계수는 곡선 형태가 다르므로 별도 상태 세트를 가집니다.",
    selectedKey: "normal",
    options: [
      { key: "gentle", label: "완만형", description: "세정 페널티를 천천히 적용합니다." },
      { key: "normal", label: "기본형", description: "기본 세정 곡선을 적용합니다." },
      { key: "sensitive", label: "민감형", description: "변화가 시작되면 빠르게 영향을 반영합니다." },
      { key: "sharp", label: "급격형", description: "초기 구간에서 강한 페널티를 즉시 반영합니다." },
    ],
  },
];

const INITIAL_SWITCH_ITEMS: ParamSwitchItem[] = [
  {
    key: "autoNormalize",
    label: "자동 정규화 사용",
    description: "유입 데이터의 스케일 차이를 자동으로 정규화해 계산식에 반영합니다.",
    helper: "활성화 시 센서 편차가 큰 라인에서도 계산 안정성이 올라가지만, 급격한 이벤트는 완화될 수 있습니다.",
    enabled: true,
  },
  {
    key: "safetyClamp",
    label: "안전 제한값 고정",
    description: "이상치가 감지되면 계산 결과를 보호 제한값에 고정합니다.",
    helper: "활성화 시 비정상 값 확산을 막지만, 과도하게 보수적인 결과가 나올 수 있습니다.",
    enabled: false,
  },
];

export { INITIAL_INPUT_FIELDS, INITIAL_RADIO_GROUPS, INITIAL_SWITCH_ITEMS };
