'use client'

import { Heart, Sparkles, Zap } from 'lucide-react'
import { ConnectButton } from '@/components/wallet/connect-button'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: 'var(--accent)'}}>
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">
            BlockFlirt
          </span>
        </div>
        <ConnectButton />
      </div>

      {/* Hero Section */}
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Main Card */}
        <div className="bg-card rounded-3xl border overflow-hidden mb-8" style={{borderColor: 'var(--border)'}}>
          {/* Header */}
          <div className="px-8 py-12 text-center" style={{backgroundColor: 'var(--accent)'}}>
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Find Your Web3 Match</h1>
            <p className="text-white/90 text-lg font-medium">Where your wallet meets your heart</p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6" style={{color: 'var(--accent)'}} />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">AI-Powered Analysis</h3>
                  <p className="text-secondary text-sm">We analyze your onchain activity and social profiles to create your unique Love Persona</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6" style={{color: 'var(--accent)'}} />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Smart Matching</h3>
                  <p className="text-secondary text-sm">Find compatibility based on Web3 interests, personality traits, and shared values</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" style={{color: 'var(--accent)'}} />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">Match NFTs</h3>
                  <p className="text-secondary text-sm">When you find a 70%+ match, mint a unique NFT on Mantle to commemorate your connection</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 space-y-3">
              <Link href="/auth" className="block">
                <Button className="w-full btn-primary py-4 rounded-xl text-lg font-semibold">
                  Start Matching
                </Button>
              </Link>
              <Button className="w-full btn-secondary py-4 rounded-xl text-lg font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1K+</div>
              <div className="text-sm text-secondary">Web3 Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-secondary">Matches Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-secondary">NFTs Minted</div>
            </div>
          </div>
          
          <p className="text-secondary text-sm px-4">
            Join the first dating app built for the Web3 community. 
            Find meaningful connections based on your digital life.
          </p>
        </div>
      </div>
    </div>
  )
}
