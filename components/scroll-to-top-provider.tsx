"use client"

import type React from "react"

import { useScrollToTop } from "@/hooks/use-scroll-to-top"

export function ScrollToTopProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useScrollToTop()

  return <>{children}</>
}
