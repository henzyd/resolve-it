import { Navigate, Outlet, useLoaderData, useLocation } from "react-router";
import { queryClient } from "~/providers/tanstack-query";
import { getUserQueryOptions } from "~/hooks/users";

export async function clientLoader() {
  const user = await queryClient.ensureQueryData(getUserQueryOptions());
  return { user };
}

export default function ProtectedLayout() {
  const { user } = useLoaderData<typeof clientLoader>();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/login?origin=${encodeURIComponent(location.pathname)}`}
        state={{ from: `${location.pathname}${location.search}` }}
        replace
      />
    );
  }

  return <Outlet />;
}
