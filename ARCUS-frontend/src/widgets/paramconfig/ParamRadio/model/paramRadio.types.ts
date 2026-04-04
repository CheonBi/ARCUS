import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { paramRadioVariants } from "./paramRadio.styles";
import type { ParamRadioGroup } from "@entities/paramconfig";

export interface paramRadioProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof paramRadioVariants> {
  groups: ParamRadioGroup[];
  canEdit: boolean;
  onValueChange: (groupKey: string, optionKey: string) => void;
}
