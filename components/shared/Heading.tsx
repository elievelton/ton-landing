import { cn } from "@/lib/utils"

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

export function Heading({
  title,
  subtitle,
  center = false,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        center && "text-center"
      )}
    >
      <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}