import * as React from "react"

import { cn } from "./lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-4 rounded-md border p-4", className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardIcon = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-10 w-10 items-center justify-center rounded-lg border", className)}
      {...props}
    />
  )
})
CardIcon.displayName = "CardIcon"

const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 space-y-1", className)}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("font-semibold", className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

export {
  Card,
  CardIcon,
  CardContent,
  CardTitle,
  CardDescription,
}
