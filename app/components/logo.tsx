import { cn } from "~/lib/utils";

type Props = React.ComponentProps<"h5"> & {
  className?: string;
};

export default function Logo({ className, ...props }: Props) {
  return (
    <h5 {...props} className={cn("text-2xl font-semibold text-nowrap italic", className)}>
      Resolve It
    </h5>
  );
}
