import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

export default function ICPAuthButton() {
  const [auth, setAuth] = useState(null);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    (async () => {
      const client = await AuthClient.create();
      setAuth(client);
      if (await client.isAuthenticated()) {
        const id = client.getIdentity();
        setPrincipal(id.getPrincipal().toString());
      }
    })();
  }, []);

  const login = async () => {
    if (!auth) return;
    await auth.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        const id = auth.getIdentity();
        setPrincipal(id.getPrincipal().toString());
      },
    });
  };

  const logout = async () => {
    if (!auth) return;
    await auth.logout();
    setPrincipal(null);
  };

  const short = (p) => (p ?` ${p.slice(0, 6)}…${p.slice(-4)}` : "");

  return principal ? (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{short(principal)}</span>
      <button
        onClick={logout}
        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={login}
      className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
    >
      Login with ICP
    </button>
  );
}