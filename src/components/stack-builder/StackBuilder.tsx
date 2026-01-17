import React from "react";
import { StackForm } from "./StackForm";
import { ConnectWithUsForm } from "./ConnectWithUsForm";
import { SuccessView } from "./SuccessView";
import { AssessmentPanel } from "./AssessmentPanel";
import { StackBuilderProvider, useStackBuilder } from "./context/StackBuilderContext";

const Logo = () => (
  <div className="mb-8">
    <img
      alt="Cleric"
      width={80}
      height={24}
      className="h-6 w-auto"
      src="/logo/cleric.svg"
    />
  </div>
);

const StackBuilderContent = () => {
  const { currentStep } = useStackBuilder();

  const renderLeftContent = () => {
    switch (currentStep) {
      case "select":
        return <StackForm />;
      case "connect":
        return <ConnectWithUsForm />;
      case "success":
        return <SuccessView />;
      default:
        return <StackForm />;
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-col w-full lg:w-1/2 lg:overflow-y-auto lg:h-screen px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex flex-col min-h-full">
          <Logo />
          {renderLeftContent()}
        </div>
      </div>

      {/* Right side - Assessment Panel with background */}
      <div className="hidden lg:block lg:w-1/2 lg:fixed lg:right-0 lg:top-0 lg:h-screen">
        <AssessmentPanel />
      </div>
    </main>
  );
};

export const StackBuilder = () => {
  return (
    <StackBuilderProvider>
      <StackBuilderContent />
    </StackBuilderProvider>
  );
};
