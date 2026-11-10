import { describe, expect, it } from "vitest";
import { app } from "./app";
describe("portable API boundary", () => {
  it("provides a health response without credentials", async () => {
    const r = await app.request("/health");
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ status: "ok", phase: "foundation" });
  });
  it("does not expose unimplemented account routes", async () => {
    const r = await app.request("/users");
    expect(r.status).toBe(404);
    expect(await r.json()).toEqual({ error: "Not found" });
  });
});
