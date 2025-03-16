import Link from "next/link"
import type { MainNavItem } from "@/types"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden gap-6 md:flex">
      <Link href="/" className="font-bold">
        Crypto Tracker
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-base"
                >
                  {item.title}
                </Link>
              ),
          )}
          {items?.map(
            (item, index) =>
              item.id && (
                <Link
                  key={index}
                  href={`/coin-by-id/${item.id}`}
                  className="flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-base"
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  )
}

