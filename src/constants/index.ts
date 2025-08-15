// Mantle Network Configuration
export const MANTLE_TESTNET = {
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  network: 'mantle-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Explorer', url: 'https://explorer.sepolia.mantle.xyz' },
  },
}

// Smart Contract Addresses (will be deployed)
export const CONTRACTS = {
  BLOCKFLIRT_MATCH_NFT: '0x...', // To be deployed
} as const

// API Endpoints
export const API_ENDPOINTS = {
  COVALENT: 'https://api.covalenthq.com/v1',
  OPENAI: 'https://api.openai.com/v1',
  REPLICATE: 'https://api.replicate.com/v1',
  TWITTER: '', // Your custom Twitter API endpoint
  IPFS_UPLOAD: 'https://api.nft.storage/upload',
} as const

// Onboarding Questions
export const ONBOARDING_QUESTIONS = [
  {
    id: 'interests',
    type: 'multiselect',
    question: 'What are your main interests?',
    options: [
      'DeFi', 'NFTs', 'Gaming', 'Art', 'Technology', 'Travel',
      'Music', 'Sports', 'Crypto Trading', 'Web3 Development',
      'DAOs', 'Metaverse', 'Photography', 'Fashion', 'Food'
    ]
  },
  {
    id: 'relationship_goal',
    type: 'select',
    question: 'What are you looking for on BlockFlirt?',
    options: [
      'Long-term serious relationship',
      'Meeting new people',
      'Friendship and networking',
      'Web3 collaborations',
      'Casual dating'
    ]
  },
  {
    id: 'personality_intro',
    type: 'slider',
    question: 'How would you describe yourself socially?',
    range: { min: 1, max: 10 },
    labels: { min: 'Introverted', max: 'Extroverted' }
  },
  {
    id: 'personality_adventure',
    type: 'slider',
    question: 'Do you prefer adventure or comfort?',
    range: { min: 1, max: 10 },
    labels: { min: 'Comfort', max: 'Adventure' }
  },
  {
    id: 'personality_decision',
    type: 'slider',
    question: 'How do you make important decisions?',
    range: { min: 1, max: 10 },
    labels: { min: 'Logic', max: 'Intuition/Emotions' }
  }
] as const

// AI Prompts
export const AI_PROMPTS = {
  CREATE_PERSONA: `You are a Web3 dating expert. Based on the user's onchain activity, Twitter data, and onboarding responses, create a unique "Love Persona" that captures their personality for Web3 dating.

User Data:
- Onchain Activity: {onchainData}
- Twitter Data: {twitterData}
- Onboarding Responses: {onboardingData}

Create a persona with:
1. personality_type: A creative 2-3 word type (e.g., "Crypto Romantic", "DeFi Explorer", "NFT Artist")
2. traits: 4-5 key personality traits
3. interests: Top interests based on all data
4. description: 2-3 sentence personality description
5. strengths: What makes them attractive in Web3 dating
6. looking_for: What type of person they'd match with
7. image_prompt: A creative prompt for generating their persona avatar

Return as JSON format.`,

  COMPATIBILITY_ANALYSIS: `You are a Web3 dating compatibility expert. Analyze two users' Love Personas and determine their compatibility.

User 1 Persona: {persona1}
User 2 Persona: {persona2}

Calculate compatibility (0-100) based on:
- Complementary traits and interests
- Shared Web3 values and goals
- Personality balance and chemistry potential
- Common ground in crypto/NFT preferences

Return JSON with:
- score: number (0-100)
- explanation: 2-3 sentence explanation
- common_interests: array of shared interests
- complementary_traits: why they complement each other
- match_reason: main reason they're a good match
- potential_challenges: possible compatibility issues

Only matches >70 score should proceed to NFT minting.`,

  IMAGE_GENERATION: `Create a stylized, romantic digital art portrait representing a Web3 Love Persona. Style: modern digital art, soft lighting, attractive and welcoming expression, subtle Web3/crypto themed elements in background (like subtle blockchain patterns, soft geometric shapes, or digital art elements). The person should look friendly, confident, and romantically appealing. Prompt: {imagePrompt}`
} as const

// Common interests for matching
export const INTEREST_CATEGORIES = {
  DEFI: ['DeFi', 'Yield Farming', 'Liquidity Providing', 'DEXs', 'Lending Protocols'],
  NFTS: ['NFTs', 'Digital Art', 'PFP Collections', 'NFT Trading', 'Generative Art'],
  GAMING: ['GameFi', 'Play-to-Earn', 'Blockchain Games', 'Virtual Worlds', 'Esports'],
  TECH: ['Web3 Development', 'Smart Contracts', 'Blockchain Technology', 'Crypto Research'],
  LIFESTYLE: ['Travel', 'Music', 'Photography', 'Fashion', 'Food', 'Fitness'],
  SOCIAL: ['DAOs', 'Community Building', 'Networking', 'Events', 'Social Impact']
} as const

// Compatibility scoring weights
export const COMPATIBILITY_WEIGHTS = {
  SHARED_INTERESTS: 0.3,
  COMPLEMENTARY_TRAITS: 0.25,
  ONCHAIN_SIMILARITY: 0.2,
  TWITTER_COMPATIBILITY: 0.15,
  PERSONALITY_BALANCE: 0.1
} as const

// UI Constants
export const UI_CONFIG = {
  MATCH_THRESHOLD: 70,
  MAX_DISPLAY_MATCHES: 10,
  PROFILE_IMAGE_SIZE: 150,
  CARD_IMAGE_SIZE: 300,
} as const