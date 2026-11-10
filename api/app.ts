import { Hono } from "hono";
export const app = new Hono();
app.get("/health", (c) => c.json({ status: "ok", phase: "foundation" }));
app.notFound((c) => c.json({ error: "Not found" }, 404));
