import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/auth";

export function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();
    if (location.pathname === "/login") return;
    if (!user) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (!user.onboardingComplete && location.pathname !== "/onboarding") {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}
