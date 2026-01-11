import { useSessionStore } from "@entities/session";
import { userQueryKeys } from "@entities/user";
import { authApi } from "@features/auth/login/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const qc = useQueryClient();
  const setToken = useSessionStore((state) => state.setToken);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (date) => {
      setToken(date.token);

      await qc.invalidateQueries({ queryKey: userQueryKeys.me() });
    },
  });
};
