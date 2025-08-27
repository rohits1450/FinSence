import { HttpAgent, Actor } from "@dfinity/agent";
// generated files will be placed under declarations/finsense_backend after deploy
import { idlFactory as finsense_idl } from "../../declarations/finsense_backend/finsense_backend.did.js";
import canisterIds from "../canister_ids.json";
import { getIdentity } from "./auth";

function currentCanisterId() {
  const network = import.meta.env.VITE_DFX_NETWORK || "local";
  return (canisterIds?.[network] || canisterIds)?.finsense_backend?.canister_id
    || canisterIds?.finsense_backend;
}

export async function getBackendActor() {
  const identity = await getIdentity();
  const agent = new HttpAgent({ identity, host: import.meta.env.VITE_IC_HOST || "http://127.0.0.1:4943" });

  // for local replica only
  if ((import.meta.env.VITE_DFX_NETWORK || "local") === "local") {
    await agent.fetchRootKey().catch(() => console.warn("fetchRootKey failed (local only)"));
  }

  const canisterId = currentCanisterId();
  return Actor.createActor(finsense_idl, { agent, canisterId });
}