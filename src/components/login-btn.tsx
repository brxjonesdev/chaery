'use client'
import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginBtn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://chaery.vercel.app/auth/callback',
      },
    })
    if (error) {
      console.error('Error logging in:', error.message)
      return
    }
    console.log('Logged in:', data)
  }
  return (
    <>
      <Button onClick={handleLogin} className="bg-cherry_light-700 hover:bg-cherry_light-800">
        Sign into Chaery
      </Button>
    </>
  )
}
