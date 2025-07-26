import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/forms/fields/form-field";
import { Button } from "~/components/ui/button";
import { useSignup } from "~/hooks/auth";
import { passwordRegex } from "~/lib/constants";
import Otp from "~/components/auth/otp";
import { filterPrivateValues } from "~/lib/utils";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  _confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup() {
  const [searchParams] = useSearchParams();

  const [{ isVerified, email }, setVerification] = useState({
    isVerified: false,
    email: "",
  });

  const { mutateAsync: signup } = useSignup();

  const getLoginUrl = useCallback(() => {
    const origin = searchParams.get("origin");
    return origin ? `/login?origin=${origin}` : "/login";
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4">
      <div className="largeMobile:gap-1 flex flex-col items-center gap-2">
        <h1 className="largeMobile:text-lg text-xl font-medium">Signup</h1>
        <small className="largeMobile:text-xs text-center">
          Create your account to get started.
        </small>
      </div>
      {isVerified && email ? (
        <Otp email={email} />
      ) : (
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            _confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const submissionValues = filterPrivateValues(values);
            await signup(submissionValues, {
              onSuccess: () => {
                resetForm();
                setVerification({ email: values.email, isVerified: true });
              },
            });
          }}
          validateOnBlur={false}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} method="POST" className="flex w-full flex-col gap-8">
              <div className="flex flex-col gap-4">
                <FormField name="first_name" label="First Name" required placeholder="John" />
                <FormField name="last_name" label="Last Name" required placeholder="Doe" />
                <FormField
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  placeholder="sample@gmail.com"
                />
                <FormField
                  label="Password"
                  type={"password"}
                  required
                  placeholder="****************"
                  name="password"
                />
                <FormField
                  label="Confirm Password"
                  type={"password"}
                  required
                  placeholder="****************"
                  name="_confirm_password"
                />
              </div>
              <div className="flex flex-col gap-5">
                <Button type="submit" loading={isSubmitting}>
                  Signup
                </Button>
                <small className="text-center">
                  Already have an account?{" "}
                  <Link to={getLoginUrl()} className="text-primary font-semibold hover:underline">
                    Login
                  </Link>
                </small>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
