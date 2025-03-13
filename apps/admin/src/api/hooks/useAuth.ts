import { useQuery } from "@tanstack/react-query";
import { api } from "./useApi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useAuth = () => useQuery<User>({ queryKey: ["profile"], queryFn: api.getProfile, retry: false });