import * as React from "react"
import { cn } from "@/lib/utils"
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => (
  <input type={type} ref={ref} className={cn("flex h-10 w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50", className)} {...props} />
))
Input.displayName = "Input"
export { Input }
