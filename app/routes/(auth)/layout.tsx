import { Link, Outlet } from "react-router";
import Logo from "~/components/logo";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 p-4 py-12">
      <main className="largeMobile_545:px-4 flex w-full max-w-[500px] flex-col gap-8 rounded-2xl bg-white p-6 shadow-xs">
        <header className="flex justify-center gap-4 pt-2">
          <Link to={"/"}>
            <Logo />
          </Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
