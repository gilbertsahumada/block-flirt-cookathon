'use client'

import { useState } from 'react'
import { Heart, Edit3, ArrowLeft, MapPin, Calendar, Link as LinkIcon, Twitter, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useWallet } from '@getpara/react-sdk'

// Mock user data - esto se reemplazaría con datos reales del usuario logueado
const mockCurrentUser = {
  id: "1",
  name: "Alex Rivera",
  age: 28,
  location: "San Francisco, CA",
  bio: "Web3 developer passionate about DeFi and NFTs. Love hiking, coffee, and building the future of finance. Looking for someone who shares my enthusiasm for technology and adventure.",
  profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  interests: ["DeFi", "NFTs", "Hiking", "Coffee", "Travel", "Photography", "Gaming", "Cooking"],
  twitterData: {
    username: "alexrivera_dev",
    displayName: "Alex Rivera",
    followerCount: 2840,
    followingCount: 892,
    bio: "Building the future of Web3 | DeFi Developer | Coffee Enthusiast"
  },
  onchainData: {
    totalValue: 45.7, // in ETH
    nftCount: 23,
    favoriteChains: ["Ethereum", "Polygon", "Mantle"],
    topNFTs: [
      { name: "CryptoPunk #4521", collection: "CryptoPunks", imageUrl: "https://via.placeholder.com/100" },
      { name: "Bored Ape #8934", collection: "BAYC", imageUrl: "https://via.placeholder.com/100" },
      { name: "Art Block #245", collection: "Art Blocks", imageUrl: "https://via.placeholder.com/100" }
    ]
  },
  lovePersona: {
    personalityType: "The Adventurous Builder",
    traits: ["Creative", "Ambitious", "Loyal", "Adventurous"],
    description: "A passionate creator who loves to build meaningful connections and explore new experiences together.",
    strengths: ["Great communicator", "Loyal partner", "Always up for adventure"]
  },
  stats: {
    matches: 42,
    profileViews: 156,
    joinDate: "2024-01-15"
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { data: wallet } = useWallet()

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{borderColor: 'var(--border)'}}>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" style={{color: 'var(--accent)'}} />
          <span className="text-lg font-bold text-primary">My Profile</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-secondary hover:text-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Profile Header Card */}
        <Card className="bg-card border rounded-3xl overflow-hidden" style={{borderColor: 'var(--border)'}}>
          {/* Cover/Header Section */}
          <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="absolute -bottom-12 left-6">
              <Avatar className="w-24 h-24 border-4 border-card">
                <AvatarImage src={mockCurrentUser.profileImageUrl} alt={mockCurrentUser.name} />
                <AvatarFallback className="text-2xl font-bold bg-secondary text-primary">
                  {mockCurrentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <CardContent className="pt-16 pb-6">
            {/* Basic Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-primary mb-1">
                {mockCurrentUser.name}, {mockCurrentUser.age}
              </h1>
              <div className="flex items-center gap-4 text-secondary text-sm mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {mockCurrentUser.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined Jan 2024
                </div>
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                {mockCurrentUser.bio}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-secondary/20 rounded-xl">
                <div className="text-xl font-bold text-primary">{mockCurrentUser.stats.matches}</div>
                <div className="text-xs text-secondary">Matches</div>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-xl">
                <div className="text-xl font-bold text-primary">{mockCurrentUser.stats.profileViews}</div>
                <div className="text-xs text-secondary">Views</div>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-xl">
                <div className="text-xl font-bold text-primary">{mockCurrentUser.onchainData.nftCount}</div>
                <div className="text-xs text-secondary">NFTs</div>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-primary mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {mockCurrentUser.interests.map((interest) => (
                  <Badge key={interest} className="btn-secondary text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Card className="bg-card border rounded-3xl overflow-hidden" style={{borderColor: 'var(--border)'}}>
          <Tabs defaultValue="persona" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/20 m-4 rounded-xl">
              <TabsTrigger value="persona" className="rounded-lg">Love Persona</TabsTrigger>
              <TabsTrigger value="web3" className="rounded-lg">Web3 Profile</TabsTrigger>
              <TabsTrigger value="social" className="rounded-lg">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="persona" className="p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {mockCurrentUser.lovePersona.personalityType}
                  </h3>
                  <p className="text-secondary text-sm mb-4">
                    {mockCurrentUser.lovePersona.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockCurrentUser.lovePersona.traits.map((trait) => (
                      <Badge key={trait} className="bg-accent/20 text-accent border-accent/30">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {mockCurrentUser.lovePersona.strengths.map((strength, index) => (
                      <li key={index} className="text-secondary text-sm flex items-center gap-2">
                        <Heart className="w-3 h-3 text-accent" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="web3" className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-primary">On-chain Portfolio</span>
                </div>

                <div className="bg-secondary/20 rounded-xl p-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{mockCurrentUser.onchainData.totalValue} ETH</div>
                    <div className="text-sm text-secondary">Total Portfolio Value</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-3">Favorite Chains</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockCurrentUser.onchainData.favoriteChains.map((chain) => (
                      <Badge key={chain} className="btn-secondary text-xs">
                        {chain}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-3">Top NFTs</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {mockCurrentUser.onchainData.topNFTs.map((nft, index) => (
                      <div key={index} className="bg-secondary/20 rounded-xl p-3 text-center">
                        <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-2"></div>
                        <div className="text-xs font-medium text-primary">{nft.name}</div>
                        <div className="text-xs text-secondary">{nft.collection}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl">
                  <Twitter className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-primary">@{mockCurrentUser.twitterData.username}</div>
                    <div className="text-sm text-secondary">{mockCurrentUser.twitterData.bio}</div>
                  </div>
                  <Button size="sm" className="btn-secondary">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary/20 rounded-xl">
                    <div className="text-lg font-bold text-primary">
                      {mockCurrentUser.twitterData.followerCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-secondary">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/20 rounded-xl">
                    <div className="text-lg font-bold text-primary">
                      {mockCurrentUser.twitterData.followingCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-secondary">Following</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/match" className="flex-1">
            <Button className="w-full btn-primary py-3 rounded-xl font-semibold">
              <Heart className="w-4 h-4 mr-2" />
              Start Matching
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="btn-secondary px-6 py-3 rounded-xl font-semibold"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}