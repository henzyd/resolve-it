import { useState, type ReactNode } from "react";
import { ErrorMessage, Field, type FieldConfig, type FieldProps } from "formik";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Input, type InputProps } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { Label, type LabelProps } from "../ui/label";

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

export default function FormField({
  label,
  description,
  type,
  subLabel,
  endAdornment,
  wrapperClassName,
  ...props
}: Props) {
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
    <Field {...props}>
      {({ field, form }: FieldProps) => (
        <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
          <div className="flex flex-col gap-2">
            {label && (
              <div className="flex w-full flex-col gap-2">
                <Label {...label} data-slot="form-label">
                  {label.children}
                  {props.required && (
                    <span className="pl-1 !text-xs !text-red-600">*</span>
                  )}
                </Label>
                {subLabel && (
                  <small
                    {...subLabel}
                    data-slot="form-sub-label"
                    className={cn(
                      "largeLaptop:!text-[0.9rem] whitespace-pre-line text-black/90",
                      subLabel.className
                    )}
                  />
                )}
              </div>
            )}
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
          </div>
          {description && (
            <p
              {...description}
              data-slot="form-description"
              className={cn("text-black/90 text-sm", description.className)}
            />
          )}
          <ErrorMessage
            name={props.name}
            data-slot="form-error-message"
            className={`pl-1 !text-xs !text-red-600`}
            component={"p"}
          />
        </div>
      )}
    </Field>
  );
}
