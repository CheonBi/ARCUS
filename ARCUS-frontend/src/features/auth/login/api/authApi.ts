import { http } from "@shared/api/http";

export type LoginRequest = {
  id: string;
  password: string;
};

export type LoginResponse = {
  token: string; // access token
};

export const authApi = {
  login: async (payload: LoginRequest) => (await http.post<LoginResponse>("/login", payload)).data,
};
