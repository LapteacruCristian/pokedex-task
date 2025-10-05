import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

interface ErrorCardProps {
  title: string;
  description?: string;
  message?: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export default function ErrorCard({
  title,
  description,
  message,
  className,
}: ErrorCardProps) {
  return (
    <Alert
      variant="destructive"
      className={cn("max-w-[500px] mx-auto border-destructive", className)}
    >
      <AlertCircleIcon />
      <AlertTitle className="text-center">{title}</AlertTitle>
      <AlertDescription>
        {description && <span>{description}</span>}
        <span>{message}</span>
      </AlertDescription>
    </Alert>
  );
}
