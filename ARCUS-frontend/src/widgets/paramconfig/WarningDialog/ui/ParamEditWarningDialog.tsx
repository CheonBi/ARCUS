import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@shared/ui/button";
import type { ParamEditWarningDialogProps } from "../model/paramDialog.types";

export const ParamEditWarningDialog = ({ open, dirtyCount, onClose, onConfirm }: ParamEditWarningDialogProps) => {
  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl rounded-4xl border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.45)] sm:p-7"
        style={{
          borderColor: "rgb(var(--layout-fg) / 0.08)",
          background: "linear-gradient(180deg, rgb(var(--layout-bg)) 0%, rgb(var(--layout-bg) / 0.96) 100%)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "rgb(248 113 113 / 0.14)", color: "rgb(253 186 116)" }}
          >
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "rgb(253 186 116)" }}>
                Calculation Server Warning
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                파라미터 수정은 계산 서버 결과에 직접 영향을 줄 수 있습니다.
              </h2>
            </div>

            <p className="text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.72)" }}>
              한 개의 계수만 수정해도 계산식 결과, 경보 기준, 추정값 추세가 함께 달라질 수 있습니다. 실제 연동 시에는
              백엔드 권한 인증과 변경 이력 저장이 반드시 선행되어야 합니다.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.03)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgb(var(--layout-fg) / 0.55)" }}
            >
              영향 범위
            </p>
            <p className="mt-2 text-sm font-semibold">실시간 계산값 / 리포트 / 경보 판단</p>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.03)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgb(var(--layout-fg) / 0.55)" }}
            >
              권한 절차
            </p>
            <p className="mt-2 text-sm font-semibold">백엔드 인증 후 편집 허용</p>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.03)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgb(var(--layout-fg) / 0.55)" }}
            >
              현재 변경 수
            </p>
            <p className="mt-2 text-sm font-semibold">{dirtyCount}건</p>
          </div>
        </div>

        <div
          className="mt-6 rounded-3xl border p-4"
          style={{ borderColor: "rgb(248 113 113 / 0.24)", backgroundColor: "rgb(248 113 113 / 0.08)" }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">프로토타입 동작 안내</p>
              <p className="text-sm leading-6" style={{ color: "rgb(var(--layout-fg) / 0.72)" }}>
                현재는 UI 검토를 위해 확인 버튼을 누르면 임시로 편집이 열립니다. 실제 서비스에서는 이 위치를 백엔드 인증
                요청으로 교체하면 됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onConfirm}>경고를 이해하고 편집 열기</Button>
        </div>
      </div>
    </div>
  );
};
