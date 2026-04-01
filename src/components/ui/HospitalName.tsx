import { cn } from "@/lib/utils";

interface HospitalNameProps {
  className?: string;
  short?: boolean;
}

export function HospitalName({ className, short = false }: HospitalNameProps) {
  return (
    <span className={cn("font-bold", className)}>
      {short ? "Gajanan Hospital" : "Gajanan Hospital & Critical Care Centre"}
    </span>
  );
}
