import { useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "~/components/ui/button";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Password changed successfully</h1>
        <small className="text-info-500 largeMobile:text-xs text-center">
          Your password has been updated successfully
        </small>
      </div>
      <figure className="w-full max-w-[100px]">
        <img src="" alt="Password changed illustration" className="h-full w-full object-contain" />
      </figure>
      <Button
        className="mx-auto flex w-fit cursor-pointer items-center gap-2"
        onClick={() => navigate("/login")}
      >
        <IoMdArrowBack />
        <small>Back to login</small>
      </Button>
    </div>
  );
}
