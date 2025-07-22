import { cn } from "~/lib/utils";

type Props = {
  containerClassName?: string;
  loaderClassName?: string;
};

export default function AppLoader({ containerClassName, loaderClassName }: Props) {
  return (
    <div className={cn("flex h-screen w-full items-center justify-center", containerClassName)}>
      <span className={cn("loader", loaderClassName)} />
    </div>
  );
}
