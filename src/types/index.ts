export interface UserProfile {
  id: string;
  walletAddress: string;
  name: string;
  age: number;
  interests: string[];
  bio: string;
  onchainData: OnchainData;
  twitterData: TwitterData;
  lovePersona: LovePersona;
  profileImageUrl?: string;
  createdAt: Date;
}

export interface OnchainData {
  nfts: NFTAsset[];
  tokens: TokenBalance[];
  transactions: Transaction[];
  totalValue: number;
  favoriteChains: string[];
}

export interface NFTAsset {
  contractAddress: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  collection: string;
  value: number;
}

export interface TokenBalance {
  symbol: string;
  balance: number;
  value: number;
  contractAddress: string;
}

export interface Transaction {
  hash: string;
  type: string;
  value: number;
  timestamp: Date;
  interactedContract?: string;
}

export interface TwitterData {
  username: string;
  displayName: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  recentTweets: Tweet[];
  interests: string[];
  personality: string[];
}

export interface Tweet {
  id: string;
  text: string;
  createdAt: Date;
  likeCount: number;
  retweetCount: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface LovePersona {
  personalityType: string;
  traits: string[];
  interests: string[];
  description: string;
  strengths: string[];
  lookingFor: string[];
  imagePrompt: string;
  generatedImageUrl?: string;
}

export interface CompatibilityMatch {
  user1: string;
  user2: string;
  score: number;
  explanation: string;
  commonInterests: string[];
  complementaryTraits: string[];
  matchReason: string;
  potentialChallenges: string[];
  nftMinted: boolean;
  nftTokenId?: string;
  createdAt: Date;
}

export interface OnboardingData {
  interests: string[];
  relationshipGoal: string;
  personalityQuestions: {
    introvert_extrovert: number;
    adventure_comfort: number;
    logical_emotional: number;
  };
  bio: string;
  twitterHandle?: string;
}

export interface MatchNFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  match_data: {
    user1_address: string;
    user2_address: string;
    compatibility_score: number;
    match_date: string;
    personas: {
      user1_persona: string;
      user2_persona: string;
    };
  };
}