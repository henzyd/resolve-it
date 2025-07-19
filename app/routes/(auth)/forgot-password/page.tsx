import { useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { IoMdArrowBack } from "react-icons/io";
import FormField from "~/components/fields/form-field";
import Button from "~/components/button";
import { useForgotPassword } from "~/hooks/auth";
import Success from "~/widgets/auth/forgot-password/success";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [{ isSuccess, email }, setInstructionsSent] = useState({
    isSuccess: false,
    email: "",
  });

  const { mutateAsync: forgotPassword } = useForgotPassword();

  if (isSuccess && email) {
    return <Success email={email} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Forgot Password?</h1>
        <small className="largeMobile:text-xs text-center">
          No worries, we'll send you reset instructions.
        </small>
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async ({ email }, { resetForm }) => {
          await forgotPassword(
            { email },
            {
              onSuccess: () => {
                resetForm();
                setInstructionsSent({ email, isSuccess: true });
              },
            }
          );
        }}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} method="POST" className="flex w-full flex-col gap-5">
            <FormField
              name="email"
              label="Email Address"
              type="email"
              required
              placeholder="sample@gmail.com"
            />
            <Button type="submit" size="large" loading={isSubmitting}>
              Send reset link
            </Button>
            <button
              className="mx-auto flex w-fit cursor-pointer items-center gap-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              <IoMdArrowBack />
              <small>Back to login</small>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
