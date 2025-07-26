import { isAxiosError } from "axios";
import { useRequestOtp } from "~/hooks/auth";
import { cn } from "~/lib/utils";

type Props = {
  email: string;
  error: Error | null;
  onVerifyRequest: () => void;
};

export default function ActivationError({ email, error, onVerifyRequest }: Props) {
  const { mutateAsync: requestOtp, isPending } = useRequestOtp();

  async function handleActivation() {
    await requestOtp({ email }, { onSuccess: onVerifyRequest });
  }

  if (!error || !isAxiosError(error)) {
    return null;
  }

  const errorMsg = error.response?.data?.error;

  if (errorMsg !== "This account has not been activated") {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <p className="text-xs font-medium text-red-600">{errorMsg}</p>
      <button
        type="button"
        className={cn("text-primary text-xs font-semibold disabled:opacity-50", {
          underline: !isPending,
        })}
        onClick={handleActivation}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Activate"}
      </button>
    </div>
  );
}
