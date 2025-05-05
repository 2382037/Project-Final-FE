// Likely located at: src/components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // For the 'asChild' prop
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils"; // Assumes you have a cn utility function

// Define the button variants using cva
const buttonVariants = cva(
  // Base classes applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Define styles for each variant
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Primary color (often black or theme color)
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Red for destructive actions
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Bordered, transparent background
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Lighter background
        ghost: "hover:bg-accent hover:text-accent-foreground", // No background or border initially
        link: "text-primary underline-offset-4 hover:underline", // Looks like a link
      },
      size: {
        // Define styles for each size
        default: "h-10 px-4 py-2", // Standard size
        sm: "h-9 rounded-md px-3", // Small size
        lg: "h-11 rounded-md px-8", // Large size
        icon: "h-10 w-10", // Square size for icons
      },
    },
    // Default variants if none are specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the props interface, extending HTML button attributes and cva variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Optional prop to render child as the main element
}

// Create the Button component using React.forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determine the component to render (Slot or button)
    const Comp = asChild ? Slot : "button";
    // Render the component with dynamically generated classes
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} // Spread remaining props (like onClick, type, children)
      />
    );
  }
);
Button.displayName = "Button"; // Set display name for debugging

// Export the Button component and the variants object
export { Button, buttonVariants };