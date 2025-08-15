'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Heart, X, Zap, Star, Search, Users, Sparkles, RotateCcw } from 'lucide-react'
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
  const [showingEndCard, setShowingEndCard] = useState(false)
  const { data: wallet } = useWallet()

  // Restore state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mantle-match-state')
      if (saved) {
        const parsed = JSON.parse(saved) as { index?: number; matches?: string[] }
        if (typeof parsed.index === 'number') setCurrentUserIndex(Math.min(parsed.index, mockUsers.length))
        if (Array.isArray(parsed.matches)) setMatches(parsed.matches)
        if (parsed.index !== undefined && parsed.index >= mockUsers.length) setShowingEndCard(true)
      }
    } catch { /* noop */ }
  }, [])

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('mantle-match-state', JSON.stringify({ index: currentUserIndex, matches }))
    } catch { /* noop */ }
  }, [currentUserIndex, matches])

  const currentUser = mockUsers[currentUserIndex]

  const vibrate = (pattern: number | number[]) => {
    try { if (typeof navigator !== 'undefined' && 'vibrate' in navigator) (navigator as any).vibrate(pattern) } catch { /* noop */ }
  }

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (isAnimating) return

    setIsAnimating(true)

    if (direction === 'right' && currentUser) {
      setMatches(prev => [...prev, currentUser.id])
      vibrate(20)
    }

    setTimeout(() => {
      setCurrentUserIndex(prev => {
        const next = prev + 1
        if (next < mockUsers.length) {
          return next
        } else {
          setShowingEndCard(true)
          return prev // keep index in range
        }
      })
      setIsAnimating(false)
    }, 300)
  }, [isAnimating, currentUser])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return
      if (e.key === 'ArrowLeft') handleSwipe('left')
      if (e.key === 'ArrowRight') handleSwipe('right')
      if (e.key === 'Backspace' || e.key.toLowerCase() === 'u') undoLast()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSwipe, isAnimating])

  // Undo last swipe
  const undoLast = () => {
    if (currentUserIndex === 0 || isAnimating) return
    const prevIndex = currentUserIndex - 1
    const prevUser = mockUsers[prevIndex]
    setShowingEndCard(false)
    setCurrentUserIndex(prevIndex)
    setMatches(m => (m[m.length - 1] === prevUser.id ? m.slice(0, -1) : m))
  }

  // Basic swipe gesture handling
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startXRef = useRef<number | null>(null)
  const threshold = 100

  const onPointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return
    setDragging(true)
    startXRef.current = e.clientX
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || isAnimating || startXRef.current === null) return
    setDragX(e.clientX - startXRef.current)
  }
  const endDrag = () => {
    if (!dragging) return
    const finalX = dragX
    setDragging(false)
    setDragX(0)
    startXRef.current = null
    if (Math.abs(finalX) > threshold) {
      handleSwipe(finalX > 0 ? 'right' : 'left')
    }
  }

  const calculateCompatibility = (user: UserProfile) => {
    // Deterministic score based on user id and username
    const key = `${user.id}:${user.twitterData.username}`
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) + hash) + key.charCodeAt(i)
      hash |= 0
    }
    const positive = (hash >>> 0) % 1000 // 0..999
    const score = 60 + Math.floor((positive / 999) * 30) // 60..90
    return score
  }

  // End card when no more users
  if (showingEndCard || currentUserIndex >= mockUsers.length) {
    return (
      <div className="min-h-screen bg-primary">
        {/* Looking for More Card - Tinder Style */}
        <div className="px-6 pb-6 pt-6">
          <Card className="max-w-md mx-auto bg-card border rounded-3xl overflow-hidden" style={{borderColor: 'var(--border)'}}>
            {/* Header Section with Gradient Background */}
            <div className="relative h-96 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center">
              <div className="text-center z-10">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Looking for More
                </h2>
                <p className="text-white/90 text-lg">
                  Amazing Matches
                </p>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 left-8">
                <Heart className="w-6 h-6 text-pink-300 animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
              <div className="absolute bottom-12 right-8">
                <Star className="w-5 h-5 text-yellow-300 animate-pulse" style={{animationDelay: '1s'}} />
              </div>
              <div className="absolute top-1/3 right-6">
                <Zap className="w-4 h-4 text-blue-300 animate-bounce" style={{animationDelay: '1.5s'}} />
              </div>
            </div>

            <CardContent className="p-6">
              {/* Stats */}
              <div className="mb-6">
                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{matches.length}</div>
                    <div className="text-xs text-secondary">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{mockUsers.length}</div>
                    <div className="text-xs text-secondary">Profiles Seen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {mockUsers.length > 0 ? Math.round((matches.length / mockUsers.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-secondary">Match Rate</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  You've seen everyone!
                </h3>
                <p className="text-secondary text-sm mb-4">
                  New profiles are added daily. Check back later to discover more amazing people in the Web3 community.
                </p>

                {/* Features List */}
                <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm text-primary">More verified Web3 profiles coming</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm text-primary">Enhanced matching algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="text-sm text-primary">Premium features launching soon</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/" className="block">
                  <Button className="w-full btn-primary py-3 rounded-xl font-semibold" aria-label="Back to Home">
                    <Heart className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full btn-secondary py-3 rounded-xl font-semibold"
                  onClick={() => {
                    setCurrentUserIndex(0)
                    setMatches([])
                    setShowingEndCard(false)
                  }}
                  aria-label="Start Over"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator - All Complete */}
          <div className="max-w-md mx-auto mt-4 flex justify-center gap-2">
            {mockUsers.map((_, index) => (
              <div
                key={index}
                className="h-1 w-8 rounded-full transition-all duration-300"
                style={{backgroundColor: 'var(--accent)'}}
              />
            ))}
          </div>

          {/* Undo button when finished */}
          <div className="max-w-md mx-auto mt-3 flex justify-center">
            <Button variant="ghost" size="sm" onClick={undoLast} disabled={currentUserIndex === 0} aria-label="Undo last swipe">
              <RotateCcw className="w-4 h-4 mr-1" /> Undo
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentUser) return null

  const compatibility = calculateCompatibility(currentUser)

  const scale = isAnimating ? 0.95 : 1
  const transform = `translateX(${dragX}px) rotate(${dragX * 0.03}deg) scale(${scale})`
  const likeOpacity = Math.min(Math.max(dragX, 0) / threshold, 1)
  const nopeOpacity = Math.min(Math.max(-dragX, 0) / threshold, 1)

  return (
    <div className="min-h-screen bg-primary">
      {/* Main Card */}
      <div className="px-6 pb-6 pt-6">
        <Card
          className={`max-w-md mx-auto bg-card border rounded-3xl overflow-hidden transition-transform duration-300 select-none cursor-grab active:cursor-grabbing`}
          style={{borderColor: 'var(--border)', transform}}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          {/* Profile Image */}
          <div className="relative h-96 bg-secondary">
            {currentUser.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                draggable={false}
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
            {/* Swipe Overlays */}
            <div
              className="pointer-events-none absolute top-6 left-6 rotate-[-15deg] border-4 rounded-lg px-3 py-1 font-bold text-lg"
              style={{
                opacity: likeOpacity,
                borderColor: 'rgb(34 197 94)', // green-500
                color: 'rgb(34 197 94)'
              }}
            >
              LIKE
            </div>
            <div
              className="pointer-events-none absolute top-6 right-6 rotate-[15deg] border-4 rounded-lg px-3 py-1 font-bold text-lg"
              style={{
                opacity: nopeOpacity,
                borderColor: 'rgb(239 68 68)', // red-500
                color: 'rgb(239 68 68)'
              }}
            >
              NOPE
            </div>
            
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
                aria-label="Pass"
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => handleSwipe('right')}
                disabled={isAnimating}
                size="lg"
                className="flex-1 btn-primary py-4 rounded-xl"
                aria-label="Like"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Progress Indicator */}
        <div className="max-w-md mx-auto mt-4 flex items-center justify-between gap-2">
          <div className="flex justify-center gap-2 flex-1">
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
          <div>
            <Button variant="ghost" size="sm" onClick={undoLast} disabled={currentUserIndex === 0 || isAnimating} aria-label="Undo last swipe">
              <RotateCcw className="w-4 h-4 mr-1" /> Undo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}