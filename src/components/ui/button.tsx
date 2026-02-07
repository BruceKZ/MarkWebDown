import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
          "transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer",
          // Variants
          variant === "default" && [
            "bg-[rgb(var(--primary))] text-white",
            "hover:bg-[rgb(var(--primary))]/90 hover:shadow-md",
            "focus-visible:ring-[rgb(var(--ring))]",
          ],
          variant === "secondary" && [
            "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]",
            "hover:bg-[rgb(var(--secondary))]/80",
          ],
          variant === "outline" && [
            "border border-[rgb(var(--border))] bg-transparent",
            "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]",
          ],
          variant === "ghost" && [
            "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]",
          ],
          // Sizes
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-10 rounded-md px-8",
          size === "icon" && "h-9 w-9",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
