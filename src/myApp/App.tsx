'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react';


export default function App() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      router.replace(`/page/1`);
    }
  }, [router])

  return (
      <h1>Welcome to RS School Next.js App Routing</h1>
  )
}

