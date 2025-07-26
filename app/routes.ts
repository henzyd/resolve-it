import type { RouteConfig } from "@react-router/dev/routes";
import { nextRoutes, appRouterStyle } from "rr-next-routes";

// const route = process.env.VITE_ROUTE || "landing";

export default nextRoutes({
  ...appRouterStyle,
  folderName: `./routes`,
}) satisfies RouteConfig;
