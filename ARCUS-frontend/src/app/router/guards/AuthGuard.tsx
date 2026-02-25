import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@app/router/routes";
import { useSessionStore } from "@entities/session";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@entities/user";

export const AuthGuard = () => {
  const location = useLocation(); // 현재 location 객체 정보

  const token = useSessionStore((state) => state.token);
  const isHydrate = useSessionStore((state) => state.isHydrated);
  const hydrate = useSessionStore((state) => state.hydrate);
  const clear = useSessionStore((state) => state.clear);

  const me = useCurrentUserQuery();

  // 최초 1회 토큰복원
  useEffect(() => {
    if (!isHydrate) {
      hydrate();
    }
  }, [isHydrate, hydrate]);

  //토큰 없으면 로그인페이지로 리다이렉트
  if (!isHydrate) return null;
  if (!token) return <Navigate to={ROUTES.LOGIN} replace />;

  //토큰 있으면 유효성 검사
  if (me.isLoading) return null;
  if (me.isError) {
    // 토큰이 만료 or 무효일 => 세션 정리 후 로그인으로
    clear();
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
