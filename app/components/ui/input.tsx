import * as React from "react";
import { cn } from "~/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="flex items-center gap-4">
        {startAdornment}
        <input
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-black/80 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
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
