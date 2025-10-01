import * as React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  size?: number; // ukuran ikon
  className?: string;
}

export function LoadingSpinner({ label = "Loading...", size = 20, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Loader2 className="animate-spin" size={size} />
      {label && <span>{label}</span>}
    </div>
  );
}
