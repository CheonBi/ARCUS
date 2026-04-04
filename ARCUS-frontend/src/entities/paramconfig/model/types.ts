export interface ParamInputField {
  key: string;
  label: string;
  description: string;
  helper: string;
  unit: string;
  value: string;
  isDirty?: boolean;
}

export interface ParamRadioOption {
  key: string;
  label: string;
  description: string;
}

export interface ParamRadioGroup {
  key: string;
  label: string;
  description: string;
  selectedKey: string;
  options: ParamRadioOption[];
  isDirty?: boolean;
}

export interface ParamSwitchItem {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  helper: string;
  isDirty?: boolean;
}
