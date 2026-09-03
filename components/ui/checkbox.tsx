"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-lg border transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        "[data-checked='false']:border-input data-checked:bg-primary data-checked:text-primary-foreground",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
        "group-focus-within/field-label:ring-0",
        "aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "[[aria-invalid='true'][data-checked='true']]:border-primary",
        "[[aria-invalid='true'][data-checked='false']]:border-destructive",
        "data-checked:border-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
