import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-padding", className)}
    >
      {children}
    </section>
  )
}