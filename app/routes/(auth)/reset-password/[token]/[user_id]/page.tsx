import { useState } from "react";
import { useParams } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useResetPassword } from "~/hooks/auth";
import { passwordRegex } from "~/utils/constants";
import FormField from "~/components/fields/form-field";
import Button from "~/components/button";
import Success from "~/widgets/auth/reset-password/success";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
  re_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const { token, user_id } = useParams<{ token: string; user_id: string }>();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync: resetPassword } = useResetPassword();

  if (isSuccess) {
    return <Success />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Reset Password</h1>
        <small className="largeMobile:text-xs text-center">
          No worries, we'll send you reset instructions.
        </small>
      </div>
      <Formik
        initialValues={{
          password: "",
          re_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          if (!token || !user_id) return;

          await resetPassword(
            {
              path: { token, uuid: user_id },
              data: { ...values },
            },
            {
              onSuccess: () => {
                resetForm();
                setIsSuccess(true);
              },
            }
          );
        }}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} method="POST" className="flex w-full flex-col gap-5">
            <FormField
              label="Password"
              type={"password"}
              required
              placeholder="****************"
              name="password"
            />
            <FormField
              label="Confirm Password"
              type={"re_password"}
              required
              placeholder="****************"
              name="re_password"
            />
            <Button type="submit" size="large" className="!mt-2" loading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
