import axios from 'axios';
import { BadgeInfo } from '@/types';

// Get environment variables
const MINT_URL = process.env.NEXT_PUBLIC_KWALA_MINT_URL || 'https://api.kwala.xyz/workflow/MintSkillBadge';
const FETCH_URL = process.env.NEXT_PUBLIC_KWALA_FETCH_URL || 'https://api.kwala.xyz/workflow/GetUserBadges';

/**
 * Mint a new skill badge for the user
 * @param walletAddress The user's wallet address
 * @returns The minted badge information
 */
export async function mintBadge(walletAddress: string): Promise<BadgeInfo> {
  try {
    // In a real implementation, this would call the actual API
    // For demo purposes, we'll simulate a successful response
    console.log('Minting badge for wallet:', walletAddress);
    
    // Return sample badge data
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: 'Web3 Developer',
      description: 'Verified skills in blockchain development and smart contracts',
      image: '',
      date: new Date().toISOString(),
      category: 'Development',
      level: 'Intermediate'
    };
  } catch (error) {
    console.error('Error minting badge:', error);
    throw new Error('Failed to mint badge');
  }
}

/**
 * Fetch all badges owned by a user
 * @param walletAddress The user's wallet address
 * @returns Array of badge information
 */
export async function getBadges(walletAddress: string): Promise<BadgeInfo[]> {
  try {
    // In a real implementation, this would call the actual API
    // For demo purposes, we'll simulate a successful response with sample data
    console.log('Fetching badges for wallet:', walletAddress);
    
    // Return sample badges data
    return [
      {
        id: '1',
        name: 'Web3 Developer',
        description: 'Verified skills in blockchain development and smart contracts',
        image: '',
        date: '2023-06-15',
        category: 'Development',
        level: 'Intermediate'
      },
      {
        id: '2',
        name: 'Smart Contract Auditor',
        description: 'Expert in reviewing and securing smart contracts',
        image: '',
        date: '2023-07-22',
        category: 'Security',
        level: 'Advanced'
      },
      {
        id: '3',
        name: 'DeFi Specialist',
        description: 'Mastery in decentralized finance protocols and mechanisms',
        image: '',
        date: '2023-08-05',
        category: 'Finance',
        level: 'Expert'
      }
    ];
  } catch (error) {
    console.error('Error fetching badges:', error);
    // Return empty array as fallback instead of throwing error
    return [];
  }
}