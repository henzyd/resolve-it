import * as React from "react";
import { cn } from "~/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startAdornment, endAdornment, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "dark:bg-input/30 border-input focus-within:border-primary focus-within:ring-ring/50 flex items-center gap-4 rounded-md border bg-transparent px-4 py-2 focus-within:ring-[1px]",
          wrapperClassName
        )}
      >
        {startAdornment}
        <input
          data-slot="input"
          className={cn(
            "file:text-foreground selection:bg-primary selection:text-primary-foreground flex w-full text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent placeholder:text-black/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
