import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/hooks/useApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => api.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },  });

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => mutation.mutate()}>Entrar</button>
      {mutation.isError && <p>Erro no login</p>}
    </div>
  );
};

export default Login;
