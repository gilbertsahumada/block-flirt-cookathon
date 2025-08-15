# BlockFlirt 💖🔗

> Where your wallet meets your heart

BlockFlirt is the first AI-powered Web3 dating application that analyzes your onchain activity, social profiles, and personality to find meaningful connections in the crypto space. Built for the Mantle hackathon.

## ✨ Features

- **🔗 Multi-Wallet Support**: Connect with Para wallet + external wallets (MetaMask, etc.)
- **🐦 Twitter Integration**: Analyze social profiles for personality insights
- **🤖 AI-Powered Matching**: Create unique "Love Personas" using OpenAI
- **⛓️ Onchain Analysis**: Analyze NFTs, tokens, and transaction history via Covalent
- **🎨 Generated Avatars**: AI-generated persona images via Stable Diffusion
- **🏆 Match NFTs**: Mint commemorative NFTs for 70%+ compatibility matches on Mantle
- **📱 Modern UI**: Tinder-style interface with Web3 elements

## 🎯 Demo & Pitch

**Tagline**: "Where your wallet meets your heart" ❤️🔗

**Elevator Pitch**: "BlockFlirt is the first dating app where compatibility is measured by your onchain and offchain life. We combine blockchain data, social profiles, and AI to find real matches... and mint them on Mantle."

## 🚀 Quick Start

### Prerequisites

1. **Para API Key**: Get your API key from [Para Developer Portal](https://developer.getpara.com)
2. **MetaMask**: For external wallet connection
3. **Node.js 18+**: For running the application

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mantle-match

# Install dependencies
npm install

# Copy environment file and add your API keys
cp .env.example .env.local

# Add your Para API key to .env.local
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Environment Variables

```env
# Required for Para wallet integration
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here

# Optional - for full functionality
OPENAI_API_KEY=your_openai_api_key
COVALENT_API_KEY=your_covalent_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
TWITTER_API_BEARER_TOKEN=your_twitter_api_bearer_token
NFT_STORAGE_API_KEY=your_nft_storage_api_key
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **UI Components**: shadcn/ui with custom BlockFlirt theme
- **Wallet Integration**: Para SDK (embedded + external wallets)
- **State Management**: React Query + React hooks
- **Blockchain**: Mantle Testnet
- **AI**: OpenAI GPT for personality analysis
- **Images**: Stable Diffusion via Replicate
- **Storage**: IPFS via NFT.Storage
- **APIs**: Covalent for onchain data, custom Twitter API

### Color Palette

- **Fuchsia Brilliant**: `#FF2E8B` (primary, energy, attraction)
- **Dark Violet**: `#5A189A` (secondary, sophisticated, dating vibe)
- **Pure White**: `#FFFFFF` (contrast, cleanliness)
- **Charcoal Gray**: `#1C1C1C` (background, elegance)

## 🔄 User Flow

1. **Landing Page**: Introduction to BlockFlirt concept
2. **Connect Para Wallet**: Embedded wallet creation
3. **Twitter Authentication**: OAuth for social profile analysis
4. **External Wallet**: Connect MetaMask/other for onchain data
5. **Onboarding Questions**: Personality and preferences survey
6. **AI Analysis**: Create Love Persona from all data sources
7. **Matching**: Swipe through compatible users
8. **Match Found**: 70%+ compatibility triggers NFT minting option
9. **NFT Minting**: Commemorate matches on Mantle blockchain

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Demo Flow

1. Visit `http://localhost:3000`
2. Click "Try Demo Flow" 
3. Follow the authentication steps
4. Experience the multi-wallet setup process

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

Add environment variables in Vercel dashboard for production.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for the Mantle Hackathon 🚀
