import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLogin } from "~/hooks/auth";
import ActivationError from "~/widgets/auth/login/activation-error";
import Otp from "~/components/auth/otp";
import FormField from "~/components/forms/fields/form-field";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [verificationState, setVerificationState] = useState({
    isVerified: false,
    email: "",
  });

  const { mutateAsync: login, error } = useLogin();

  const { email, isVerified } = verificationState;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="largeMobile:text-lg text-xl">Welcome</h1>
        <small className="largeMobile:text-xs text-center">
          Please enter your login details to continue
        </small>
      </div>
      {isVerified && email ? (
        <Otp email={email} />
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await login(
              { ...values },
              {
                onSuccess: () => {
                  resetForm();
                  navigate(searchParams.get("origin") || "/dashboard");
                },
              }
            );
          }}
          validateOnBlur={false}
        >
          {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
            <form onSubmit={handleSubmit} method="POST" className="flex w-full flex-col gap-5">
              <div className="flex flex-col gap-4">
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
                <div className="flex items-center justify-between gap-4">
                  <div className="mediumMobile:self-start flex items-center gap-2">
                    <Checkbox
                      onChange={() => {
                        setFieldValue("rememberMe", !values.rememberMe);
                      }}
                      checked={values.rememberMe}
                      name="rememberMe"
                    />
                    <small className="text-zinc-600">Remember me</small>
                  </div>
                  <Link to={"/forgot-password"} className="hover:underline">
                    <small className="text-zinc-600">Forgot Password</small>
                  </Link>
                </div>
              </div>
              <ActivationError
                email={values.email}
                error={error}
                onVerifyRequest={() =>
                  setVerificationState({
                    email: values.email,
                    isVerified: true,
                  })
                }
              />
              <Button type="submit" loading={isSubmitting}>
                Login
              </Button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
