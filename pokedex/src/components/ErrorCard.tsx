import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface ErrorCardProps {
  title: string;
  description?: string;
  message?: string;
}

export default function ErrorCard({
  title,
  description,
  message,
}: ErrorCardProps) {
  return (
    <Alert variant="destructive" className="sm:w-9/12 lg:w-6/12 mx-auto">
      <AlertCircleIcon />
      <AlertTitle className="text-center">{title}</AlertTitle>
      <AlertDescription>
        {description && <p>{description}</p>}
        <p>{message}</p>
      </AlertDescription>
    </Alert>
  );
}
