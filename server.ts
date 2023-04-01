import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SECRET: string;
}

type Context = EventContext<Env, string, unknown>;

declare module "@remix-run/server-runtime" {
  interface AppLoadContext extends Env {}
}

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context: Context) => {
    return {
      SUPABASE_URL: context.env.SUPABASE_URL,
      SUPABASE_SECRET: context.env.SUPABASE_SECRET,
    }
  },
});

export function onRequest(context: Context) {
  return handleRequest(context);
}
