import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "~/store/auth";
import AppLoader from "~/components/loaders/app";

export default function ProtectedLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <AppLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?origin=${location.pathname}`}
        state={{
          from: `${location.pathname}${location.search}`,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
