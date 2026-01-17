import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        className
      )}
      {...props}
    >
      <div className="rounded-2xl border border-white/30 p-2 max-w-lg w-full">
        <div className="rounded-xl bg-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export { GlassCard };
