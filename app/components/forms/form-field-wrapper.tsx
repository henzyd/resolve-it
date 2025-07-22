import { type ReactNode } from "react";
import { Field, ErrorMessage, type FieldConfig, type FieldProps } from "formik";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";

type Props = FieldConfig & {
  label?: string;
  description?: string;
  wrapperClassName?: string;
  subLabel?: string;
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
          <div className="space-y-2.5">
            {label && (
              <div className="flex items-center gap-1">
                <Label htmlFor={name}>
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </Label>
                {subLabel && <small className={"text-zinc-700"}>{subLabel}</small>}
              </div>
            )}
            <div>
              {children(fieldProps)}
              {description && <p className={"text-sm text-zinc-700"}>{description}</p>}
              <ErrorMessage name={name} component="small" className="text-red-500" />
            </div>
          </div>
        )}
      </Field>
    </div>
  );
}
