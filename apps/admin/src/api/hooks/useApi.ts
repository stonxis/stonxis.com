export const api = {
    login: async (email: string, password: string) => {
        const res = await fetch("http://api.stonxis.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        if (!res.ok) throw new Error("Login falhou");
        return res.json();
    },
    getProfile: async () => {
        const res = await fetch("http://api.stonxis.com/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Não autenticado");
        return res.json();
    },
};