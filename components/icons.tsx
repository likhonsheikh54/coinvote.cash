import type React from "react"
export function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20.94c1.5 0 2.75-.75 4.5-.75 1.5 0 2.5.75 4.5.75V4c-2 0-3 .75-4.5.75-1.75 0-3-.75-4.5-.75-1.5 0-2.75.75-4.5.75-1.5 0-2.5-.75-4.5-.75v16.94c2 0 3-.75 4.5-.75 1.75 0 3 .75 4.5.75z" />
    </svg>
  )
}

export function AndroidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 16V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2z" />
      <path d="M12 6V4" />
      <path d="M12 20v-2" />
      <path d="M8 6l-4 4 4 4" />
      <path d="M16 6l4 4-4 4" />
    </svg>
  )
}

