import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="animate-spin">
        <Loader2 className="w-16 h-16" />
      </div>
    </div>
  );
}

export default Loading;
