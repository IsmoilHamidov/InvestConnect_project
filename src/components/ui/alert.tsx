import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends React.ComponentProps<"div"> {
  type: "success" | "error" | "info" | "warning";
  title?: string;
  description: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type, title, description, className, ...props }, ref) => {
    const typeStyles = {
      success: "bg-green-50 text-green-800  h-full",
      error: "bg-red-100 text-red-700 border-red-200",
      info: "bg-blue-100 text-blue-700 border-blue-200",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start space-x-4 rounded-md border p-4",
          typeStyles[type],
          className
        )}
        {...props}
      >
        <div>
          {title && <h4 className="font-bold">{title}</h4>}
          <p>{description}</p>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
