"use client"

import type React from "react"
import { Suspense } from "react"

import { useScrollToTop } from "@/hooks/use-scroll-to-top"

function ScrollToTopRunner() {
  useScrollToTop()
  return null
}

export function ScrollToTopProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTopRunner />
      </Suspense>
      {children}
    </>
  )
}
