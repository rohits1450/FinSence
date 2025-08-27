import { AuthClient } from "@dfinity/auth-client";

export async function getAuthClient() {
  return await AuthClient.create();
}

export async function login() {
  const authClient = await getAuthClient();
  await authClient.login({
    identityProvider:
      import.meta.env.VITE_II_URL || "https://identity.ic0.app",
    onSuccess: () => window.location.reload()
  });
}

export async function logout() {
  const authClient = await getAuthClient();
  await authClient.logout();
  window.location.reload();
}

export async function getIdentity() {
  const authClient = await getAuthClient();
  return authClient.getIdentity();
}

export async function isAuthenticated() {
  const authClient = await getAuthClient();
  return await authClient.isAuthenticated();
}