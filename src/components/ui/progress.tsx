import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-white/10",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 transition-all duration-500 ease-in-out animate-gradient"
          style={{
            width: `${value}%`,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
