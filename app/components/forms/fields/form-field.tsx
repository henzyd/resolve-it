import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Input, type InputProps } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { LabelProps } from "~/components/ui/label";
import { FormFieldWrapper } from "../form-field-wrapper";
import type { FieldConfig } from "formik";

type Props = Omit<InputProps, "label"> &
  FieldConfig & {
    label?: LabelProps;
    description?: React.ComponentProps<"p">;
    wrapperClassName?: string;
    subLabel?: React.ComponentProps<"small">;
  };

type PasswordToggleButtonProps = {
  showPassword: boolean;
  onToggle: () => void;
};

const PasswordToggleButton = ({
  showPassword,
  onToggle,
}: PasswordToggleButtonProps) => (
  <Button type="button" variant="ghost" size="icon" onClick={onToggle}>
    {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
    <span className="sr-only">
      {showPassword ? "Hide password" : "Show password"}
    </span>
  </Button>
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
      return (
        <PasswordToggleButton
          showPassword={showPassword}
          onToggle={togglePassword}
        />
      );
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
