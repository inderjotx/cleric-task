import React from "react";
import { StackCategory } from "./StackCategory";
import { STACK_CONFIG, type AssessmentLevel } from "./config";
import { Circle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStackBuilder } from "./context/StackBuilderContext";

const Header = () => (
  <div className="w-full max-w-md">
    <h1 className="text-3xl font-medium tracking-tight mb-3">
      Select your stack
    </h1>
    <p className="text-muted-foreground mb-8">
      Select your stack to see if Cleric is a fit. If it is, get 4 weeks
      free.
    </p>
  </div>
);

const CategoryList = () => (
  <div className="mb-6">
    <div className="space-y-6">
      {STACK_CONFIG.map((category) => (
        <StackCategory key={category.id} category={category} />
      ))}
    </div>
  </div>
);

const StatusIcon = ({
  icon,
  className,
}: {
  icon: AssessmentLevel["icon"];
  className?: string;
}) => {
  switch (icon) {
    case "empty":
      return <Circle className={cn("h-4 w-4", className)} aria-hidden="true" />;
    case "warning":
      return (
        <AlertCircle className={cn("h-4 w-4", className)} aria-hidden="true" />
      );
    case "check":
    case "complete":
      return (
        <CheckCircle2 className={cn("h-4 w-4", className)} aria-hidden="true" />
      );
    default:
      return null;
  }
};

const getAssessmentTone = (enabledCategoriesCount: number) => {
  if (enabledCategoriesCount <= 0) {
    return {
      container: "bg-gray-50 border-gray-200",
      primaryText: "text-gray-700",
      secondaryText: "text-gray-600",
      icon: "text-gray-500",
    };
  }
  if (enabledCategoriesCount <= 2) {
    return {
      container: "bg-amber-50 border-amber-200",
      primaryText: "text-amber-900",
      secondaryText: "text-amber-800",
      icon: "text-amber-600",
    };
  }
  return {
    container: "bg-emerald-50 border-emerald-200",
    primaryText: "text-emerald-900",
    secondaryText: "text-emerald-800",
    icon: "text-emerald-600",
  };
};

const AssessmentBar = () => {
  const { assessmentLevel, enabledCategoriesCount, canContinue, goToConnect } =
    useStackBuilder();

  const { title, description, fitText, fitDescription, icon } = assessmentLevel;
  const displayText = fitText || title;
  const displayDescription = fitDescription || description;
  const tone = getAssessmentTone(enabledCategoriesCount);

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 border-t backdrop-blur-sm z-10 mt-6",
        tone.container
      )}
      data-testid="fit-assessment-bar"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="shrink-0">
            <StatusIcon icon={icon} className={tone.icon} />
          </div>
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {displayText && (
              <span className={cn("font-medium text-sm", tone.primaryText)}>
                {displayText}
              </span>
            )}
            {displayText && (
              <span className={cn("text-sm", tone.secondaryText)}>|</span>
            )}
            <span className={cn("text-sm", tone.primaryText)}>
              {enabledCategoriesCount}/5 enabled
            </span>
            <span className={cn("text-sm hidden sm:inline", tone.secondaryText)}>
              |
            </span>
            <span className={cn("text-sm hidden sm:inline", tone.secondaryText)}>
              {displayDescription}
            </span>
          </div>
        </div>
        {canContinue && (
          <Button
            onClick={goToConnect}
            className="shrink-0 bg-gray-900 hover:bg-gray-800 text-white"
          >
            Continue
          </Button>
        )}
      </div>
      <div className={cn("sm:hidden px-4 pb-3 text-sm", tone.secondaryText)}>
        {displayDescription}
      </div>
    </div>
  );
};

export const StackForm = () => {
  return (
    <div className="flex-1">
      <div className="w-full max-w-md">
        <Header />
        <CategoryList />
        <AssessmentBar />
      </div>
    </div>
  );
};
