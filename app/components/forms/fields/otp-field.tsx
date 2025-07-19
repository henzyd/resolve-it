import { type FieldConfig } from "formik";
import { cn } from "~/lib/utils";
import { FormFieldWrapper } from "../form-field-wrapper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "~/components/ui/input-otp";
import { type LabelProps } from "~/components/ui/label";

type Props = FieldConfig & {
  label?: LabelProps | string;
  description?: React.ComponentProps<"p"> | string;
  wrapperClassName?: string;
  subLabel?: React.ComponentProps<"small"> | string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  onChange?: (value: string) => void;
  groupSize?: number;
  showSeparator?: boolean;
};

export default function OTPField({
  maxLength = 6,
  className,
  onChange,
  groupSize = 3,
  showSeparator = true,
  ...props
}: Props) {
  const renderSlots = () => {
    const slots = [];
    const groups = Math.ceil(maxLength / groupSize);

    for (let groupIndex = 0; groupIndex < groups; groupIndex++) {
      const groupSlots = [];
      const startIndex = groupIndex * groupSize;
      const endIndex = Math.min(startIndex + groupSize, maxLength);

      for (let slotIndex = startIndex; slotIndex < endIndex; slotIndex++) {
        groupSlots.push(<InputOTPSlot key={slotIndex} index={slotIndex} />);
      }

      slots.push(<InputOTPGroup key={groupIndex}>{groupSlots}</InputOTPGroup>);

      if (showSeparator && groupIndex < groups - 1) {
        slots.push(<InputOTPSeparator key={`separator-${groupIndex}`} />);
      }
    }

    return slots;
  };

  return (
    <FormFieldWrapper {...props}>
      {({ field, form }) => (
        <InputOTP
          maxLength={maxLength}
          value={field.value || ""}
          onChange={(value) => {
            form.setFieldValue(field.name, value);
            if (onChange) {
              onChange(value);
            }
          }}
          onBlur={() => {
            form.setFieldTouched(field.name, true);
          }}
          className={cn(className)}
        >
          {renderSlots()}
        </InputOTP>
      )}
    </FormFieldWrapper>
  );
}
