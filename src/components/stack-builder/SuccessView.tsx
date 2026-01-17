import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStackBuilder } from "./context/StackBuilderContext";

export const SuccessView = () => {
  const { resetState } = useStackBuilder();

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
      </div>

      <h1 className="text-3xl font-medium tracking-tight mb-3">
        Thank you!
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md">
        We've received your request. A Cleric engineer will reach out within 24
        hours to set up your dedicated instance and schedule a call.
      </p>

      <Button
        onClick={resetState}
        variant="outline"
        className="text-gray-900"
      >
        Start over
      </Button>
    </div>
  );
};
