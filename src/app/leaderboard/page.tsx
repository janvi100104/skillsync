'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';

interface LeaderboardEntry {
  id: string;
  name: string;
  wallet: string;
  badgeCount: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Simulate fetching leaderboard data
      const sampleLeaders: LeaderboardEntry[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          wallet: '0x742d...8f3c',
          badgeCount: 12,
          rank: 1
        },
        {
          id: '2',
          name: 'Sam Chen',
          wallet: '0xa83f...2b1d',
          badgeCount: 9,
          rank: 2
        },
        {
          id: '3',
          name: 'Maria Garcia',
          wallet: '0xf2c1...9e4a',
          badgeCount: 8,
          rank: 3
        },
        {
          id: '4',
          name: 'Jordan Smith',
          wallet: '0x3d9b...1c7e',
          badgeCount: 7,
          rank: 4
        },
        {
          id: '5',
          name: 'Taylor Kim',
          wallet: '0x6e44...a2f8',
          badgeCount: 6,
          rank: 5
        },
        {
          id: '6',
          name: 'Casey Brown',
          wallet: '0xb7d2...5c3f',
          badgeCount: 5,
          rank: 6
        },
        {
          id: '7',
          name: 'Riley Davis',
          wallet: '0x2c8a...7d9b',
          badgeCount: 4,
          rank: 7
        },
        {
          id: '8',
          name: 'Morgan Wilson',
          wallet: '0x9f1e...4a6c',
          badgeCount: 3,
          rank: 8
        }
      ];
      
      setTimeout(() => {
        setLeaders(sampleLeaders);
        setLoading(false);
      }, 1000);
    }
  }, [isClient]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Leaderboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Top badge earners in our community
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-6">User</div>
                  <div className="col-span-5 text-right">Badges</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaders.map((leader, index) => (
                  <motion.div
                    key={leader.id}
                    className="grid grid-cols-12 gap-4 p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="col-span-1 flex items-center">
                      {leader.rank <= 3 ? (
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          leader.rank === 1 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' 
                            : leader.rank === 2 
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500'
                        }`}>
                          {leader.rank}
                        </div>
                      ) : (
                        <div className="text-gray-500 dark:text-gray-400">
                          {leader.rank}
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-6">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {leader.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {leader.wallet}
                      </div>
                    </div>
                    
                    <div className="col-span-5 flex items-center justify-end">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {leader.badgeCount} badges
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Keep earning badges to climb the leaderboard!
              </p>
              <button 
                onClick={() => window.location.href = '/mint'}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Earn More Badges
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}