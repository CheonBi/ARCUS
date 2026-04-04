import type { HTMLAttributes } from "react";

export interface ParamEditWarningDialogProps extends HTMLAttributes<HTMLElement> {
  open: boolean;
  dirtyCount: number;
  onClose: () => void;
  onConfirm: () => void;
}
