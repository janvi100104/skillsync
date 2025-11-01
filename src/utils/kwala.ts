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
    
    // Check if wallet address is provided
    if (!walletAddress) {
      console.warn('No wallet address provided for badge fetching');
      return [];
    }
    
    // Validate the URL
    if (!FETCH_URL || FETCH_URL === 'undefined') {
      console.error('FETCH_URL is not properly configured');
      return [];
    }
    
    // Call the actual Kwala workflow
    const response = await axios.get(`${FETCH_URL}?walletAddress=${encodeURIComponent(walletAddress)}`, {
      timeout: 10000 // 10 second timeout
    });
    
    // Return the badges data from the API response
    return response.data.badges || response.data || [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // More detailed error logging
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNABORTED') {
        console.error('Network error while fetching badges:', error.message);
      } else if (error.response) {
        console.error('API error while fetching badges:', error.response.status, error.response.data);
      } else {
        console.error('Error fetching badges:', error.message);
      }
      // Return empty array as fallback instead of throwing error
      return [];
    } else {
      console.error('Unexpected error while fetching badges:', error);
      return [];
    }
  }
}