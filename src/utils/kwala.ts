import axios, { AxiosError } from 'axios';
import { BadgeInfo } from '@/types';

// Get environment variables
const MINT_URL = process.env.NEXT_PUBLIC_KWALA_MINT_URL || 'https://api.kwala.xyz/workflow/MintSkillBadge';
const FETCH_URL = process.env.NEXT_PUBLIC_KWALA_FETCH_URL || 'https://api.kwala.xyz/workflow/GetUserBadges';

/**
 * Mint a new skill badge for the user
 * @param walletAddress The user's wallet address
 * @param level The badge level (beginner, intermediate, advanced, expert)
 * @returns The minted badge information
 */
export async function mintBadge(walletAddress: string, level: string = 'intermediate'): Promise<BadgeInfo> {
  try {
    console.log('Minting badge for wallet:', walletAddress, 'at level:', level);
    
    // Call the actual Kwala workflow
    const response = await axios.post(MINT_URL, {
      walletAddress,
      level,
      skill: 'Web3 Developer',
      date: new Date().toISOString()
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Return the badge data from the API response
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error minting badge:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to mint badge');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Failed to mint badge');
    }
  }
}

/**
 * Fetch all badges owned by a user
 * @param walletAddress The user's wallet address
 * @returns Array of badge information
 */
export async function getBadges(walletAddress: string): Promise<BadgeInfo[]> {
  try {
    console.log('Fetching badges for wallet:', walletAddress);
    
    // Call the actual Kwala workflow
    const response = await axios.get(`${FETCH_URL}?walletAddress=${encodeURIComponent(walletAddress)}`);
    
    // Return the badges data from the API response
    return response.data.badges || response.data || [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching badges:', error.response?.data || error.message);
      // Return empty array as fallback instead of throwing error
      return [];
    } else {
      console.error('Unexpected error:', error);
      return [];
    }
  }
}