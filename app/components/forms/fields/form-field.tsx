import { useState } from "react";
import type { FieldConfig } from "formik";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Input, type InputProps } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FormFieldWrapper } from "../form-field-wrapper";

type Props = Omit<InputProps, "label"> &
  FieldConfig & {
    label?: string;
    description?: string;
    wrapperClassName?: string;
    subLabel?: string;
  };

type PasswordToggleButtonProps = {
  showPassword: boolean;
  onToggle: () => void;
};

const PasswordToggleButton = ({ showPassword, onToggle }: PasswordToggleButtonProps) => (
  <button type="button" onClick={onToggle}>
    {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
  </button>
);

export default function FormField({ type, endAdornment, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const togglePassword = () => setShowPassword((prev) => !prev);

  const getInputType = () => {
    if (!isPasswordField) return type;
    return showPassword ? "text" : "password";
  };

  const getEndAdornment = () => {
    if (isPasswordField) {
      return <PasswordToggleButton showPassword={showPassword} onToggle={togglePassword} />;
    }
    return endAdornment;
  };

  return (
    <FormFieldWrapper {...props}>
      {({ field, form }) => (
        <Input
          {...field}
          {...props}
          type={getInputType()}
          endAdornment={getEndAdornment()}
          data-slot="form-input"
          onChange={(e) => {
            const value = e.target.value;

            if (type === "number") {
              if (/^\d+$/.test(value)) {
                form.setFieldValue(props.name, value);
              }
            } else {
              field.onChange(e);
            }
          }}
        />
      )}
    </FormFieldWrapper>
  );
}
