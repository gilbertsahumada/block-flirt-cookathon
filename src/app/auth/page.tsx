'use client'

import { Heart } from 'lucide-react'
import { AuthFlowSimple } from '@/components/wallet/auth-flow-simple'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blockflirt-fuchsia to-blockflirt-purple rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blockflirt-fuchsia to-blockflirt-purple bg-clip-text text-transparent">
            BlockFlirt
          </span>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-medium-contrast hover:text-high-contrast">
            Back
          </Button>
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-high-contrast mb-2">
            Connect your X profile
          </h1>
          <p className="text-medium-contrast">
            Connect your X account to create your Love Persona and find meaningful connections
          </p>
        </div>
        
        <AuthFlowSimple />
      </div>
    </div>
  )
}