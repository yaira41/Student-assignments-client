import { StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function Frontend({ stack }: StackContext) {
  const { api } = use(API);

  const staticSite = new StaticSite(stack, "frontend", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: api.url,
    }
  });

  stack.addOutputs({
    SiteUrl: staticSite.url || "http://localhost:3000",
  });

  return {
    staticSite
  }
}
