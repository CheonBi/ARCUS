import { cn } from "@shared/lib/cn";
import { paramInputFieldVariants, paramInputStyles, paramInputVariants } from "../model/paramInput.styles";
import type { paramInputProps } from "../model/paramInput.types";

export const ParamInputWidget = ({
  fields,
  canEdit,
  onFieldChange,
  className,
  variant,
  style,
  ...props
}: paramInputProps) => {
  return (
    <section
      className={cn(paramInputVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={paramInputStyles.content}>
        <div className={paramInputStyles.header}>
          <div className={paramInputStyles.textBlock}>
            <h2 className={paramInputStyles.title}>직접 입력 계수</h2>
            <p className={paramInputStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
              계산 서버에 반영되는 8개 계수를 직접 입력하는 영역입니다. 권한 인증 전에는 조회만 가능하며, 인증 후에도
              변경 내용은 별도 검토가 필요합니다.
            </p>
          </div>

          <div className={paramInputStyles.badgeRow}>
            <span
              className={paramInputStyles.badge}
              style={{
                borderColor: "rgb(var(--layout-fg) / 0.1)",
                backgroundColor: "rgb(var(--layout-fg) / 0.04)",
              }}
            >
              총 {fields.length}개 계수
            </span>
            <span
              className={paramInputStyles.badge}
              style={{
                borderColor: canEdit ? "rgb(34 197 94 / 0.35)" : "rgb(245 158 11 / 0.35)",
                backgroundColor: canEdit ? "rgb(34 197 94 / 0.12)" : "rgb(245 158 11 / 0.12)",
                color: canEdit ? "rgb(187 247 208)" : "rgb(253 224 71)",
              }}
            >
              {canEdit ? "편집 가능" : "권한 필요"}
            </span>
          </div>
        </div>

        <div className={paramInputStyles.grid}>
          {fields.map((field) => (
            <div
              key={field.key}
              className={cn(
                paramInputFieldVariants({ dirty: field.isDirty, disabled: !canEdit }),
                paramInputStyles.fieldCard,
              )}
              style={{
                borderColor: field.isDirty ? undefined : "rgb(var(--layout-fg) / 0.08)",
                backgroundColor: field.isDirty ? undefined : "rgb(var(--layout-fg) / 0.01)",
              }}
            >
              <div className={paramInputStyles.fieldHead}>
                <div className={paramInputStyles.fieldLabelRow}>
                  <div>
                    <p className={paramInputStyles.fieldLabel}>{field.label}</p>
                    <p className={paramInputStyles.fieldDescription} style={{ color: "rgb(var(--layout-fg) / 0.64)" }}>
                      {field.description}
                    </p>
                  </div>
                  {field.isDirty && <span className={paramInputStyles.dirtyBadge}>변경됨</span>}
                </div>
              </div>

              <label
                className={paramInputStyles.inputWrap}
                style={{
                  borderColor: "rgb(var(--layout-fg) / 0.08)",
                  backgroundColor: "rgb(var(--layout-fg) / 0.03)",
                }}
              >
                <input
                  className={paramInputStyles.input}
                  value={field.value}
                  disabled={!canEdit}
                  onChange={(event) => onFieldChange(field.key, event.target.value)}
                />
                <span className={paramInputStyles.unit} style={{ color: "rgb(var(--layout-fg) / 0.5)" }}>
                  {field.unit}
                </span>
              </label>

              <p className={paramInputStyles.helper} style={{ color: "rgb(var(--layout-fg) / 0.54)" }}>
                {field.helper}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
