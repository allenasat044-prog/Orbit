"use client"

import { cva } from "class-variance-authority"
import { HTMLMotionProps, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const morphingSquareVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      top: "flex-col-reverse",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export interface MorphingSquareProps {
  message?: string
  /**
   * Position of the message relative to the spinner.
   * @default bottom
   */
  messagePlacement?: "top" | "bottom" | "left" | "right"
}

/**
 * Loading indicator (21st.dev "morphing-square"). Orbit EO additions: it announces itself to screen readers,
 * and people who prefer reduced motion get a gentle fade instead of the spinning.
 */
export function MorphingSquare({
  className,
  message,
  messagePlacement = "bottom",
  ...props
}: HTMLMotionProps<"div"> & MorphingSquareProps) {
  const reduced = useReducedMotion()
  return (
    <div role="status" aria-live="polite" aria-label={message ?? "Loading"} className={cn(morphingSquareVariants({ messagePlacement }))}>
      <motion.div
        className={cn("w-10 h-10 bg-foreground", className)}
        animate={
          reduced
            ? { opacity: [1, 0.35, 1] }
            : {
                borderRadius: ["6%", "50%", "6%"],
                rotate: [0, 180, 360],
              }
        }
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        {...props}
      />
      {message && <div>{message}</div>}
    </div>
  )
}
