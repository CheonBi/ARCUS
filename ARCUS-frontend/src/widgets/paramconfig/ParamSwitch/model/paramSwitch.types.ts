import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { paramSwitchVariants } from "./paramSwitch.styles";
import type { ParamSwitchItem } from "@entities/paramconfig";

export interface paramSwitchProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof paramSwitchVariants> {
  items: ParamSwitchItem[];
  canEdit: boolean;
  onSwitchChange: (itemKey: string) => void;
}
