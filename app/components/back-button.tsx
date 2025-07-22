import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";

type Props = {
  text: string;
  href: string;
};

export default function BackButton({ text, href }: Props) {
  const navigate = useNavigate();

  return (
    <button className="flex items-center gap-1 text-zinc-600" onClick={() => navigate(href)}>
      <IoIosArrowRoundBack className="stroke-[3] text-2xl" />
      <small className="font-medium">{text}</small>
    </button>
  );
}
