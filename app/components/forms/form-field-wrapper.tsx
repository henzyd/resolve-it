import { type ReactNode } from "react";
import { Field, ErrorMessage, type FieldConfig, type FieldProps } from "formik";
import { cn } from "~/lib/utils";
import { Label, type LabelProps } from "../ui/label";

type Props = FieldConfig & {
  label?: LabelProps | string;
  description?: React.ComponentProps<"p"> | string;
  wrapperClassName?: string;
  subLabel?: React.ComponentProps<"small"> | string;
  required?: boolean;
  name: string;
  children: (fieldProps: FieldProps) => ReactNode;
};

export function FormFieldWrapper({
  label,
  description,
  subLabel,
  wrapperClassName,
  required,
  name,
  children,
  ...fieldConfig
}: Props) {
  return (
    <div className={cn(wrapperClassName)}>
      <Field name={name} {...fieldConfig}>
        {(fieldProps: FieldProps) => (
          <div className="space-y-2">
            <div className="space-y-1">
              {label && (
                <div className="flex items-center gap-1">
                  {typeof label === "string" ? (
                    <Label htmlFor={name}>
                      {label}
                      {required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  ) : (
                    <Label htmlFor={name} {...label}>
                      {label.children}
                      {required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  )}
                  {subLabel && (
                    <small
                      {...(typeof subLabel === "string" ? {} : subLabel)}
                      className={cn(
                        "text-muted-foreground",
                        typeof subLabel === "object" ? subLabel.className : ""
                      )}
                    >
                      {typeof subLabel === "string"
                        ? subLabel
                        : subLabel.children}
                    </small>
                  )}
                </div>
              )}
              {children(fieldProps)}
            </div>
            {description && (
              <p
                {...(typeof description === "string" ? {} : description)}
                className={cn(
                  "text-sm text-muted-foreground",
                  typeof description === "object" ? description.className : ""
                )}
              >
                {typeof description === "string"
                  ? description
                  : description.children}
              </p>
            )}
            <ErrorMessage
              name={name}
              component="div"
              className="text-sm text-red-500"
            />
          </div>
        )}
      </Field>
    </div>
  );
}
