import { type ReactNode } from "react";
import { Field, ErrorMessage, type FieldConfig, type FieldProps } from "formik";
import { cn } from "~/lib/utils";
import { Label, type LabelProps } from "../ui/label";

type Props = FieldConfig & {
  label?: LabelProps;
  description?: React.ComponentProps<"p">;
  wrapperClassName?: string;
  subLabel?: React.ComponentProps<"small">;
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
    <Field name={name} {...fieldConfig}>
      {(fieldProps: FieldProps) => (
        <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
          <div className="flex flex-col gap-2">
            {label && (
              <div className="flex w-full flex-col gap-2">
                <Label {...label} data-slot="form-label">
                  {label.children}
                  {required && (
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
            {children(fieldProps)}
          </div>
          {description && (
            <p
              {...description}
              data-slot="form-description"
              className={cn("text-black/90 text-sm", description.className)}
            />
          )}
          <ErrorMessage
            name={name}
            data-slot="form-error-message"
            className={`pl-1 !text-xs !text-red-600`}
            component={"p"}
          />
        </div>
      )}
    </Field>
  );
}
