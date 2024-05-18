'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const ReactQueryProvider = ({children}:{
    children: React.ReactNode
}) => {
  const queryClient = new QueryClient()

  return (
     <QueryClientProvider client={queryClient}>
            {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider