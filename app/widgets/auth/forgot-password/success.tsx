import { useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "~/components/ui/button";

export default function Success({ email }: { email: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Check your mail</h1>
        <small className="largeMobile:text-xs text-center">
          We sent a password reset link to{" "}
          <span className="text-primary font-medium">{email}</span>
        </small>
      </div>
      <figure className="w-full max-w-[100px] px-4">
        <img src="" alt="" className="h-full w-full object-contain" />
      </figure>
      <Button
        className="mx-auto flex w-fit items-center gap-2"
        onClick={() => navigate("/login")}
      >
        <IoMdArrowBack />
        <small>Back to login</small>
      </Button>
    </div>
  );
}
