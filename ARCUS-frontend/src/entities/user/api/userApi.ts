import { http } from "@shared/api/http";

export type currentUser = {
  id: string;
  name: string;
  roles: string[];
  orgIds: string[];
};

export const userApi = {
  getCurrentUser: async () => (await http.get<currentUser>("/me")).data,
};
