import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PlayfulButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  loading?: boolean;
}

export const PlayfulButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  icon: Icon,
  className,
  loading = false
}: PlayfulButtonProps) => {
  const baseClasses = "font-bold rounded-2xl transition-all duration-200 hover-lift border-2 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-primary text-white border-transparent shadow-medium hover:shadow-strong",
    secondary: "bg-gradient-secondary text-white border-transparent shadow-medium hover:shadow-strong", 
    accent: "bg-gradient-accent text-white border-transparent shadow-medium hover:shadow-strong",
    outline: "border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        loading && "animate-pulse",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : Icon ? (
          <Icon className="h-5 w-5" />
        ) : null}
        {children}
      </div>
      
      {/* Playful shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
    </Button>
  );
};