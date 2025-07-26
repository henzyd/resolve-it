import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRequestOtp, useVerifyOtp } from "~/hooks/auth";
import OTPField from "~/components/forms/fields/otp-field";
import { Button } from "../ui/button";

const OTP_LENGTH = 6;

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(OTP_LENGTH, `OTP must be ${OTP_LENGTH} digits`)
    .required("OTP is required"),
});

export default function Otp({ email }: { email: string }) {
  const navigate = useNavigate();

  const [count, setCount] = useState(60);

  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const { mutateAsync: requestOtp, isPending: requestIsPending } = useRequestOtp();

  useEffect(() => {
    if (count > 0 && count < 60) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const startCountdown = () => setCount(59);

  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async ({ otp }) => {
          await verifyOtp(
            { otp },
            {
              onSuccess: async () => {
                navigate("/login");
              },
            }
          );
        }}
        validateOnBlur={false}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col gap-8" method="POST">
            <OTPField name="otp" required maxLength={OTP_LENGTH} wrapperClassName="self-center" />
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={values.otp.length !== OTP_LENGTH}
            >
              Confirm
            </Button>
          </form>
        )}
      </Formik>
      <small className="flex gap-1">
        Having troubles with otp?{" "}
        {count > 0 && count < 60 ? (
          <p>
            Retry in <span>{count}</span>
          </p>
        ) : (
          <button
            className="text-primary cursor-pointer text-xs"
            onClick={async () => {
              await requestOtp(
                { email },
                {
                  onSuccess: () => {
                    startCountdown();
                  },
                }
              );
            }}
            disabled={requestIsPending}
          >
            {requestIsPending ? "Loading..." : "Request new OTP"}
          </button>
        )}
      </small>
    </div>
  );
}
