import { Lock, ShieldCheck, ShieldEllipsis, TriangleAlert } from "lucide-react";
import { useParamConfigData } from "@pages/paramconfig/model";
import { Button } from "@shared/ui/button";
import { ParamInputWidget, ParamRadioWidget, ParamSwitchWidget } from "@widgets/paramconfig";
import { ParamEditWarningDialog } from "../../../widgets/paramconfig/WarningDialog/ui/ParamEditWarningDialog";

export const ParamConfigPage = () => {
  const paramConfigData = useParamConfigData();

  return (
    <>
      <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <section
          className="rounded-4xl border p-5 shadow-[0_20px_60px_rgba(2,6,23,0.18)] sm:p-6"
          style={{
            borderColor: "rgb(var(--layout-fg) / 0.08)",
            background:
              "linear-gradient(135deg, rgb(var(--layout-fg) / 0.07) 0%, rgb(var(--layout-fg) / 0.03) 40%, rgb(248 113 113 / 0.1) 100%)",
          }}
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: "rgb(248 113 113 / 0.28)",
                    backgroundColor: "rgb(248 113 113 / 0.1)",
                    color: "rgb(254 215 170)",
                  }}
                >
                  <TriangleAlert className="h-3.5 w-3.5" />
                  계산 서버 영향
                </span>

                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: paramConfigData.canEdit ? "rgb(34 197 94 / 0.28)" : "rgb(250 204 21 / 0.28)",
                    backgroundColor: paramConfigData.canEdit ? "rgb(34 197 94 / 0.1)" : "rgb(250 204 21 / 0.1)",
                    color: paramConfigData.canEdit ? "rgb(220 252 231)" : "rgb(254 240 138)",
                  }}
                >
                  {paramConfigData.canEdit ? <ShieldCheck className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  {paramConfigData.canEdit ? "편집 세션 열림" : "권한 인증 필요"}
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Param Config</h1>
                <p
                  className="mt-3 max-w-3xl text-sm leading-7 sm:text-base"
                  style={{ color: "rgb(var(--layout-fg) / 0.74)" }}
                >
                  계산 서버에 영향을 미치는 파라미터를 유형별로 분리한 페이지입니다. 현재는 권한 인증, 경고 다이얼로그,
                  편집 잠금 상태를 먼저 검토할 수 있는 기본 UI 구조만 연결했습니다.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:min-w-[320px]">
              <div
                className="rounded-3xl border p-4"
                style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.03)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgb(var(--layout-fg) / 0.55)" }}
                >
                  변경 현황
                </p>
                <p className="mt-2 text-2xl font-semibold">{paramConfigData.dirtyCount}건</p>
                <p className="mt-2 text-sm" style={{ color: "rgb(var(--layout-fg) / 0.64)" }}>
                  수정된 값은 아직 저장되지 않았으며, 추후 백엔드 승인 흐름에 연결될 예정입니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {paramConfigData.canEdit ? (
                  <Button variant="outline" className="flex-1" onClick={paramConfigData.handleEditLock}>
                    편집 잠금
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={paramConfigData.handleWarningOpen}>
                    <ShieldEllipsis className="mr-2 h-4 w-4" />
                    편집 권한 요청
                  </Button>
                )}

                <Button variant="outline" className="flex-1" disabled>
                  변경 적용 요청
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ParamInputWidget
          fields={paramConfigData.inputFields}
          canEdit={paramConfigData.canEdit}
          onFieldChange={paramConfigData.handleFieldChange}
        />

        <ParamRadioWidget
          groups={paramConfigData.radioGroups}
          canEdit={paramConfigData.canEdit}
          onValueChange={paramConfigData.handleRadioChange}
        />

        <ParamSwitchWidget
          items={paramConfigData.switchItems}
          canEdit={paramConfigData.canEdit}
          onSwitchChange={paramConfigData.handleSwitchChange}
        />
      </div>

      <ParamEditWarningDialog
        open={paramConfigData.isWarningOpen}
        dirtyCount={paramConfigData.dirtyCount}
        onClose={paramConfigData.handleWarningClose}
        onConfirm={paramConfigData.handleWarningConfirm}
      />
    </>
  );
};
