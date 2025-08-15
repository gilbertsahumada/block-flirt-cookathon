import { UserProfile } from '@/types';

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    walletAddress: "0x742d35cc6c123456789abcdef0123456789abcdef",
    name: "",
    age: 28,
    interests: ["crypto", "art", "technology"],
    bio: "",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400&h=400&fit=crop&crop=face",
    onchainData: {
      nfts: [],
      tokens: [],
      transactions: [],
      totalValue: 0,
      favoriteChains: ["Ethereum", "Polygon"]
    },
    twitterData: {
      username: "alexacrypto",
      displayName: "Alex ⚡",
      bio: "Building the future of finance 🚀 Digital artist exploring Web3",
      followerCount: 5200,
      followingCount: 800,
      tweetCount: 1200,
      recentTweets: [],
      interests: ["crypto", "art", "technology"],
      personality: ["creative", "analytical", "optimistic"]
    },
    lovePersona: {
      personalityType: "The Creative Innovator",
      traits: ["Creative", "Analytical", "Adventurous", "Empathetic"],
      interests: ["Digital Art", "DeFi", "Travel", "Philosophy"],
      description: "A creative soul with a passion for innovation and meaningful connections",
      strengths: ["Great communication", "Artistic vision", "Tech-savvy"],
      lookingFor: ["Intellectual stimulation", "Shared adventures", "Emotional depth"],
      imagePrompt: "A modern digital artist in a cozy studio"
    },
    createdAt: new Date()
  },
  {
    id: "2",
    walletAddress: "0x842d35cc6c123456789abcdef0123456789abcdef",
    name: "",
    age: 31,
    interests: ["Gaming", "Music", "Tech", "Fitness"],
    bio: "",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    onchainData: {
      nfts: [],
      tokens: [],
      transactions: [],
      totalValue: 0,
      favoriteChains: ["Polygon", "Arbitrum"]
    },
    twitterData: {
      username: "marcusbeats",
      displayName: "Marcus 🎵",
      bio: "Music producer & GameFi developer 🎮 Creating beats and building virtual worlds",
      followerCount: 2800,
      followingCount: 1200,
      tweetCount: 800,
      recentTweets: [],
      interests: ["music", "gaming", "tech"],
      personality: ["creative", "social", "ambitious"]
    },
    lovePersona: {
      personalityType: "The Creative Techie",
      traits: ["Creative", "Social", "Passionate", "Ambitious"],
      interests: ["Music Production", "Gaming", "Technology", "Fitness"],
      description: "A creative technologist who loves music, games, and meaningful connections",
      strengths: ["Musical talent", "Technical skills", "Social energy"],
      lookingFor: ["Creative collaboration", "Fun adventures", "Deep conversations"],
      imagePrompt: "A music producer in a high-tech studio"
    },
    createdAt: new Date()
  },
  {
    id: "3",
    walletAddress: "0x942d35cc6c123456789abcdef0123456789abcdef",
    name: "",
    age: 26,
    interests: ["Sustainability", "Reading", "Yoga", "Web3"],
    bio: "",
    profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    onchainData: {
      nfts: [],
      tokens: [],
      transactions: [],
      totalValue: 0,
      favoriteChains: ["Ethereum", "Celo"]
    },
    twitterData: {
      username: "sophiegreen",
      displayName: "Sophie 🌱",
      bio: "Environmental scientist building a greener future through Web3 🌍 Love yoga, books & sustainability",
      followerCount: 1500,
      followingCount: 600,
      tweetCount: 400,
      recentTweets: [],
      interests: ["sustainability", "science", "wellness"],
      personality: ["thoughtful", "caring", "determined"]
    },
    lovePersona: {
      personalityType: "The Conscious Innovator",
      traits: ["Thoughtful", "Caring", "Determined", "Wise"],
      interests: ["Environmental Science", "Meditation", "Books", "Sustainable Tech"],
      description: "A mindful person dedicated to creating positive change in the world",
      strengths: ["Deep empathy", "Scientific mind", "Calm presence"],
      lookingFor: ["Shared values", "Intellectual growth", "Peaceful moments"],
      imagePrompt: "A serene scientist in a green laboratory"
    },
    createdAt: new Date()
  },
  {
    id: "4",
    walletAddress: "0xa42d35cc6c123456789abcdef0123456789abcdef",
    name: "",
    age: 29,
    interests: ["Photography", "Travel", "DApps", "Coffee"],
    bio: "",
    profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    onchainData: {
      nfts: [],
      tokens: [],
      transactions: [],
      totalValue: 0,
      favoriteChains: ["Ethereum", "Base"]
    },
    twitterData: {
      username: "davidcodes",
      displayName: "David 📸",
      bio: "Full-stack developer building dApps 🌍 Photography enthusiast capturing moments around the world",
      followerCount: 3200,
      followingCount: 900,
      tweetCount: 950,
      recentTweets: [],
      interests: ["photography", "development", "travel"],
      personality: ["curious", "detail-oriented", "adventurous"]
    },
    lovePersona: {
      personalityType: "The Artistic Builder",
      traits: ["Curious", "Detail-oriented", "Adventurous", "Patient"],
      interests: ["Photography", "Coding", "Travel", "Coffee Culture"],
      description: "A detail-oriented creator who sees beauty in both code and life",
      strengths: ["Technical expertise", "Artistic eye", "World perspective"],
      lookingFor: ["Creative partnership", "Travel companion", "Thoughtful discussions"],
      imagePrompt: "A developer with a camera in a modern coffee shop"
    },
    createdAt: new Date()
  }
];