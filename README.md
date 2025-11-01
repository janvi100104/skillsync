# SkillSync - Web3 Skill Badges Platform

SkillSync is a Web3 platform that allows users to mint and showcase verifiable skill badges on the blockchain. Built with Next.js 14, RainbowKit, Wagmi, and Tailwind CSS.

## Features

1. **Wallet Connection**: Connect your wallet via RainbowKit + Wagmi
2. **Mint Badges**: Mint NFT badges by calling Kwala workflow endpoints
3. **Display Badges**: Fetch and display badges owned by your wallet
4. **Responsive UI**: Mobile-friendly design with Tailwind CSS
5. **Animations**: Smooth animations with Framer Motion
6. **Toast Notifications**: User feedback for actions
7. **Confetti Animations**: Celebration effects when minting badges
8. **Badge Gallery**: Public showcase of all badges in the system
9. **Badge Details Modal**: Click on any badge to see detailed information
10. **Social Sharing**: Share your badges on Twitter, LinkedIn, or copy the link
11. **Leaderboard**: See top badge earners in the community
12. **User Profiles**: Customize your profile with bio and social links
13. **Search & Filter**: Find badges by name, category, or level
14. **Achievement System**: Multiple badge levels (Beginner to Expert)

## Tech Stack

- **Next.js 14** (App Router)
- **RainbowKit + Wagmi + viem** for wallet integration
- **Tailwind CSS** for styling
- **axios** for API calls
- **Framer Motion** for animations
- **Lucide-react** for icons
- **shadcn/ui** for UI components
- **canvas-confetti** for celebration effects

## Prerequisites

- Node.js 16.8 or later
- npm, yarn, or pnpm

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_KWALA_MINT_URL=https://api.kwala.xyz/workflow/MintSkillBadge
NEXT_PUBLIC_KWALA_FETCH_URL=https://api.kwala.xyz/workflow/GetUserBadges
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
```

### 5. Start Production Server

```bash
npm start
```

## Usage Guide

### Connect Wallet

1. Visit the homepage
2. Click "Connect Wallet" button
3. Select your preferred wallet provider
4. Approve the connection request

### Mint a Badge

1. Navigate to the "Mint Badge" page
2. Select your desired badge level (Beginner, Intermediate, Advanced, Expert)
3. Click the "Earn Badge" button
4. Confirm the transaction in your wallet
5. Enjoy the confetti celebration!
6. View your new badge in the Dashboard

### View Badges

1. Navigate to the "Dashboard" page
2. All badges owned by your connected wallet will be displayed
3. Click on any badge to see detailed information
4. Share your badges on social media

### Explore Gallery

1. Visit the "Gallery" page
2. Browse all badges in the system
3. Use search and filter options to find specific badges
4. Click on badges to see details

### Check Leaderboard

1. Navigate to the "Leaderboard" page
2. See the top badge earners in the community
3. Get inspired to earn more badges

### Customize Profile

1. Go to your "Profile" page (accessible after connecting wallet)
2. Edit your name, bio, website, and social links
3. Save your profile changes
4. View your badges in your profile

## Project Structure

```
src/
├── app/
│   ├── page.tsx               # Home page
│   ├── dashboard/page.tsx     # Dashboard page
│   ├── mint/page.tsx          # Mint Badge page
│   ├── gallery/page.tsx       # Badge gallery
│   ├── leaderboard/page.tsx   # Community leaderboard
│   ├── profile/page.tsx       # User profile
│   └── layout.tsx             # Root layout
├── components/
│   ├── BadgeCard.tsx          # Badge display component
│   ├── BadgeModal.tsx         # Badge details modal
│   ├── Navbar.tsx             # Navigation bar
│   ├── Providers.tsx          # Wagmi/RainbowKit providers
│   └── ui/                    # shadcn/ui components
├── utils/
│   └── kwala.ts               # Kwala API helpers
├── types/
│   └── index.ts               # TypeScript types
└── lib/
    └── utils.ts               # Utility functions
```

## API Integration

The application integrates with Kwala workflows:

1. **MintSkillBadge**: `POST https://api.kwala.xyz/workflow/MintSkillBadge`
2. **GetUserBadges**: `GET https://api.kwala.xyz/workflow/GetUserBadges`

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Wallet Configuration

Wallet connection settings can be modified in `src/components/Providers.tsx`.

## Troubleshooting

### Common Issues

1. **Wallet connection fails**: Ensure you have a Web3 wallet installed (MetaMask, Rainbow, etc.)
2. **API calls failing**: Check your environment variables and network connectivity
3. **Animations not working**: Verify Framer Motion is properly installed

### Support

For issues, please open a GitHub issue or contact the development team.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.