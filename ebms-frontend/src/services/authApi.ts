import api from "./api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {

  const response = await api.post(
    "/auth/login",
    request
  );

  return response.data;
};