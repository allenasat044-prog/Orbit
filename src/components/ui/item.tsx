import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const itemVariants = cva("group/item flex items-center border border-transparent text-sm rounded-md transition-colors hover:bg-accent/50 flex-wrap outline-none",
  { variants: { variant: { default: "bg-transparent", outline: "border-border", muted: "bg-muted/50" }, size: { default: "p-4 gap-4", sm: "py-3 px-4 gap-2.5" } }, defaultVariants: { variant: "default", size: "default" } })
function Item({ className, variant = "default", size = "default", asChild = false, ...props }: React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return <Comp data-slot="item" className={cn(itemVariants({ variant, size, className }))} {...props} />
}
const mediaVariants = cva("flex shrink-0 items-center justify-center gap-2", { variants: { variant: { default: "bg-transparent", icon: "size-8 border rounded-sm bg-muted [&_svg]:size-4", image: "size-10 rounded-sm overflow-hidden" } }, defaultVariants: { variant: "default" } })
const ItemGroup = ({ className, ...p }: React.ComponentProps<"div">) => <div role="list" className={cn("flex flex-col", className)} {...p} />
const ItemMedia = ({ className, variant = "default", ...p }: React.ComponentProps<"div"> & VariantProps<typeof mediaVariants>) => <div className={cn(mediaVariants({ variant, className }))} {...p} />
const ItemContent = ({ className, ...p }: React.ComponentProps<"div">) => <div className={cn("flex flex-1 flex-col gap-1", className)} {...p} />
const ItemTitle = ({ className, ...p }: React.ComponentProps<"div">) => <div className={cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium", className)} {...p} />
const ItemDescription = ({ className, ...p }: React.ComponentProps<"p">) => <p className={cn("text-muted-foreground line-clamp-2 text-sm", className)} {...p} />
const ItemActions = ({ className, ...p }: React.ComponentProps<"div">) => <div className={cn("flex items-center gap-2", className)} {...p} />
export { Item, ItemMedia, ItemContent, ItemGroup, ItemTitle, ItemDescription, ItemActions }
