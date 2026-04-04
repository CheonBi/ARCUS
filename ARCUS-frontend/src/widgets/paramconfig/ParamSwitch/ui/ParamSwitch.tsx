import { cn } from "@shared/lib/cn";
import {
  paramSwitchRowVariants,
  paramSwitchStyles,
  paramSwitchToggleVariants,
  paramSwitchVariants,
} from "../model/paramSwitch.styles";
import type { paramSwitchProps } from "../model/paramSwitch.types";

export const ParamSwitchWidget = ({
  items,
  canEdit,
  onSwitchChange,
  className,
  variant,
  style,
  ...props
}: paramSwitchProps) => {
  return (
    <section
      className={cn(paramSwitchVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={paramSwitchStyles.content}>
        <div className={paramSwitchStyles.header}>
          <h2 className={paramSwitchStyles.title}>보호 스위치 계수</h2>
          <p className={paramSwitchStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            운영 중 오동작을 줄이기 위한 보호성 파라미터입니다. ON/OFF 전환만으로도 계산 결과에 영향이 생길 수 있습니다.
          </p>
        </div>

        <div className={paramSwitchStyles.list}>
          {items.map((item) => (
            <article
              key={item.key}
              className={cn(paramSwitchRowVariants({ dirty: item.isDirty, disabled: !canEdit }))}
              style={{
                borderColor: item.isDirty ? undefined : "rgb(var(--layout-fg) / 0.08)",
                backgroundColor: item.isDirty ? undefined : "rgb(var(--layout-fg) / 0.02)",
              }}
            >
              <div className={paramSwitchStyles.row}>
                <div className={paramSwitchStyles.rowText}>
                  <div className="flex flex-wrap items-center gap-2 ">
                    <h3 className={paramSwitchStyles.rowTitle}>{item.label}</h3>
                    <span
                      className={paramSwitchStyles.stateBadge}
                      style={{
                        backgroundColor: item.enabled ? "rgb(16 185 129 / 0.16)" : "rgb(var(--layout-fg) / 0.06)",
                        color: item.enabled ? "rgb(209 250 229)" : "rgb(var(--layout-fg) / 0.65)",
                      }}
                    >
                      {item.enabled ? "ON" : "OFF"}
                    </span>
                    {item.isDirty && <span className={paramSwitchStyles.dirtyBadge}>변경됨</span>}
                  </div>

                  <p className={paramSwitchStyles.rowDescription} style={{ color: "rgb(var(--layout-fg) / 0.64)" }}>
                    {item.description}
                  </p>
                  <p className={paramSwitchStyles.helper} style={{ color: "rgb(var(--layout-fg) / 0.54)" }}>
                    {item.helper}
                  </p>
                </div>

                <div className={paramSwitchStyles.toggleWrap}>
                  <button
                    type="button"
                    disabled={!canEdit}
                    className={cn(paramSwitchToggleVariants({ enabled: item.enabled, disabled: !canEdit }))}
                    style={{
                      borderColor: item.enabled ? undefined : "rgb(var(--layout-fg) / 0.1)",
                      backgroundColor: item.enabled ? undefined : "rgb(var(--layout-fg) / 0.04)",
                    }}
                    onClick={() => onSwitchChange(item.key)}
                  >
                    <span
                      aria-label="knob"
                      className={paramSwitchStyles.knob}
                      style={{ transform: item.enabled ? "translateX(24px)" : "translateX(0)" }}
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
