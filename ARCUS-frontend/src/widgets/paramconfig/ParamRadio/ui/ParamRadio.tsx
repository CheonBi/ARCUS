import { cn } from "@shared/lib/cn";
import {
  paramRadioCardVariants,
  paramRadioOptionVariants,
  paramRadioStyles,
  paramRadioVariants,
} from "../model/paramRadio.styles";
import type { paramRadioProps } from "../model/paramRadio.types";

export const ParamRadioWidget = ({
  groups,
  canEdit,
  onValueChange,
  className,
  variant,
  style,
  ...props
}: paramRadioProps) => {
  return (
    <section
      className={cn(paramRadioVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={paramRadioStyles.content}>
        <div className={paramRadioStyles.header}>
          <h2 className={paramRadioStyles.title}>상태 선택 계수</h2>
          <p className={paramRadioStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            두 개의 핵심 계수는 각각 독립된 상태 세트를 가지며, 운영 시나리오에 맞는 모드를 선택할 수 있습니다.
          </p>
        </div>

        <div className={paramRadioStyles.grid}>
          {groups.map((group) => (
            <article
              key={group.key}
              className={cn(paramRadioCardVariants({ dirty: group.isDirty, disabled: !canEdit }))}
              style={{
                borderColor: group.isDirty ? undefined : "rgb(var(--layout-fg) / 0.08)",
                backgroundColor: group.isDirty ? undefined : "rgb(var(--layout-fg) / 0.02)",
              }}
            >
              <div className={paramRadioStyles.cardHead}>
                <div>
                  <h3 className={paramRadioStyles.cardTitle}>{group.label}</h3>
                  <p className={paramRadioStyles.cardDescription} style={{ color: "rgb(var(--layout-fg) / 0.64)" }}>
                    {group.description}
                  </p>
                </div>
                {group.isDirty && <span className={paramRadioStyles.dirtyBadge}>변경됨</span>}
              </div>

              <div className={paramRadioStyles.optionGrid}>
                {group.options.map((option) => {
                  const isSelected = group.selectedKey === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={!canEdit}
                      className={cn(paramRadioOptionVariants({ selected: isSelected, disabled: !canEdit }))}
                      style={{
                        borderColor: isSelected ? undefined : "rgb(var(--layout-fg) / 0.1)",
                        backgroundColor: isSelected ? undefined : "rgb(var(--layout-fg) / 0.03)",
                        color: isSelected ? undefined : "rgb(var(--layout-fg) / 0.86)",
                      }}
                      onClick={() => onValueChange(group.key, option.key)}
                    >
                      <p className={paramRadioStyles.optionLabel}>{option.label}</p>
                      <p
                        className={paramRadioStyles.optionDescription}
                        style={{ color: "rgb(var(--layout-fg) / 0.58)" }}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
