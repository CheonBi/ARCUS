import { useSessionStore } from "@entities/session";
import { userApi } from "@entities/user/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const userQueryKeys = {
  me: () => ["me"] as const,
};

export const useCurrentUserQuery = () => {
  const token = useSessionStore((state) => state.token);
  const isHydrated = useSessionStore((state) => state.isHydrated);

  return useQuery({
    queryKey: userQueryKeys.me(),
    queryFn: userApi.getCurrentUser,
    enabled: isHydrated && Boolean(token),
    staleTime: 60_000,
    retry: 0,
  });
};
