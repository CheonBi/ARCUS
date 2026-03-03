import { createBrowserRouter } from "react-router";
import { MainLayout } from "@app/layouts/AppShell";
import { ROUTES } from "@shared/consts/routes";

//Pages
import { LandingPage } from "@pages/landing/ui/LandingPage";
import { LoginPage } from "@pages/login/ui/LoginPage";
import { SignupPage } from "@pages/signup/ui/SignupPage";

// Errors
import { NotFoundPage } from "@pages/errors/ui/NotFoundPage";
import { ForbiddenPage } from "@pages/errors/ui/ForbiddenPage";
import { guarded } from "@app/router/guards/helpers";
import { AuthGuard } from "@app/router/guards/AuthGuard";
import { MainBoardPage } from "@pages/mainboard/ui/MainBoardPage";

/**
 * 기본 구조
 * - /app/:orgId/* 는 항상 AuthGuard + OrgGuard 적용
 * - org onboarding은 로그인만 필요
 */
export const router = createBrowserRouter([
  //Public
  { path: ROUTES.ENTRY, element: <LandingPage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignupPage /> },

  //Dev routes
  {
    path: ROUTES.APP_DEV,
    element: <MainLayout />,
    children: [
      { path: ROUTES.DEV_MAINBOARD, element: <MainBoardPage /> },
      { path: ROUTES.DEV_DAILY, element: <div>Daily</div> },
      { path: ROUTES.DEV_EVENT, element: <div>Event</div> },
      { path: ROUTES.DEV_SETTINGS, element: <div>Settings</div> },
    ],
  },

  // Protected Routes
  // Org onboarding (login required, org not required)
  guarded(AuthGuard, [
    {
      path: ROUTES.APP,
      element: <MainLayout />,
      children: [],
    },
  ]),

  // 권한 에러 페이지
  { path: "/403", element: <ForbiddenPage /> },

  // Global 404
  { path: "*", element: <NotFoundPage /> },
]);
