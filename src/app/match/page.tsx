'use client'

import { useState, useEffect } from 'react'
import { Heart, X, Zap, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUsers } from '@/data/mockUsers'
import { UserProfile } from '@/types'
import Link from 'next/link'
import { useWallet } from '@getpara/react-sdk'

export default function MatchPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const { data: wallet } = useWallet()
  
  const currentUser = mockUsers[currentUserIndex]
  const hasMoreUsers = currentUserIndex < mockUsers.length - 1

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    if (direction === 'right') {
      setMatches(prev => [...prev, currentUser.id])
    }
    
    setTimeout(() => {
      if (hasMoreUsers) {
        setCurrentUserIndex(prev => prev + 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  const calculateCompatibility = (user: UserProfile) => {
    // Simulate compatibility calculation based on interests and onchain data
    const baseScore = Math.floor(Math.random() * 30) + 60 // 60-90%
    return baseScore
  }

  if (!hasMoreUsers && currentUserIndex >= mockUsers.length) {
    return (
      <div className="min-h-screen bg-primary p-6">
        <div className="max-w-md mx-auto pt-20">
          <Card className="bg-card border rounded-3xl" style={{borderColor: 'var(--border)'}}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10" style={{color: 'var(--accent)'}} />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                That's everyone for now!
              </h2>
              <p className="text-secondary mb-6">
                You've seen all available profiles. Check back later for new potential matches!
              </p>
              <p className="text-sm text-muted mb-6">
                Matches found: {matches.length}
              </p>
              <Link href="/">
                <Button className="w-full btn-primary py-3 rounded-xl font-semibold">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentUser) return null

  const compatibility = calculateCompatibility(currentUser)

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/auth">
          <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" style={{color: 'var(--accent)'}} />
          <span className="text-lg font-bold text-primary">BlockFlirt</span>
        </div>
        <div className="text-sm text-secondary">
          {matches.length} matches
        </div>
      </div>

      {/* Main Card */}
      <div className="px-6 pb-6">
        <Card className={`max-w-md mx-auto bg-card border rounded-3xl overflow-hidden transition-transform duration-300 ${
          isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
        }`} style={{borderColor: 'var(--border)'}}>
          {/* Profile Image */}
          <div className="relative h-96 bg-secondary">
            {currentUser.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-primary text-2xl font-bold">
                    {currentUser.twitterData.displayName.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            
            {/* Compatibility Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="btn-primary text-white border-0 px-3 py-1">
                <Star className="w-3 h-3 mr-1" />
                {compatibility}% Match
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Name and Age */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-primary">
                {currentUser.twitterData.displayName}, {currentUser.age}
              </h1>
              <p className="text-sm text-secondary">@{currentUser.twitterData.username}</p>
            </div>

            {/* Bio */}
            <p className="text-secondary text-sm mb-4 line-clamp-3">
              {currentUser.twitterData.bio}
            </p>

            {/* Interests */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-primary mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.slice(0, 4).map((interest) => (
                  <Badge
                    key={interest}
                    className="btn-secondary text-xs"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Love Persona */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-primary mb-2">Love Persona</h3>
              <div className="bg-card rounded-xl p-3 border" style={{borderColor: 'var(--border)'}}>
                <p className="text-sm font-medium text-primary mb-1">
                  {currentUser.lovePersona.personalityType}
                </p>
                <p className="text-xs text-secondary line-clamp-2">
                  {currentUser.lovePersona.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => handleSwipe('left')}
                disabled={isAnimating}
                size="lg"
                className="flex-1 btn-secondary py-4 rounded-xl"
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => handleSwipe('right')}
                disabled={isAnimating}
                size="lg"
                className="flex-1 btn-primary py-4 rounded-xl"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto mt-4 flex justify-center gap-2">
          {mockUsers.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index <= currentUserIndex
                  ? 'w-8'
                  : 'bg-secondary w-2'
              }`}
              style={index <= currentUserIndex ? {backgroundColor: 'var(--accent)'} : {}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}