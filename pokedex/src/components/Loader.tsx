import { Loader2Icon } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2Icon className="animate-spin" />
      <span>Please wait</span>
    </div>
  );
}
