// src/hooks/useAuthToken.ts
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useAuthToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? `Bearer ${token}` : null;
};
