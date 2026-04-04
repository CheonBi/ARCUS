import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { paramInputVariants } from "./paramInput.styles";
import type { ParamInputField } from "@entities/paramconfig";

export interface paramInputProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof paramInputVariants> {
  fields: ParamInputField[];
  canEdit: boolean;
  onFieldChange: (fieldKey: string, nextValue: string) => void;
}
